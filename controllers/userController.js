const db = require('../config/db');
const bcrypt = require('bcrypt');

// Get All Users List
const getUsers = async (req,res) => {
    try {
        const data = await db.query('SELECT * FROM users');
        if (!data){
            return res.status(404).send({
                success: false,
                message:'Usuario no encontrado'
            })
        }
        res.status(200).send({
            success: true,
            message:'Lista de usuarios',
            totalUsers: data[0].length,
            data: data[0],
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'Error al obtener usuarios',
            error
        })
    }
}

const getUserByID = async (req,res) => {
    try {
        const userID = req.params.id;
        if (!userID){
            return res.status(404).send({
                success: false,
                message: "Por favor ingrese un ID"
            })
        }
        const data = await db.query(`SELECT * FROM users WHERE id = ?`, [userID]);
        if (!data){
            return res.status(404).send({
                success: false,
                message: "Usuario no encontrado"
            })
        }
        res.status(200).send({
            success: true,
            userDetail:data[0]
        })
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success: false,
            message: "Error al obtener el usuario",
            error
        })
    }
};

// Create New User 
const createUser = async (req,res) => {
    try {
        const {firstName, lastName, username, userMail, userPassword} = req.body;
        let passwordHaash = await bcrypt.hash(userPassword, 8);
        if (!firstName || !lastName || !username || !userMail || !userPassword){
            return res.status(500).send({
                success: false,
                message: "Por favor ingrese todos los campos",
            })
        }
        const data = await db.query(`INSERT INTO users (firstName, lastName, username, userMail, userPassword) VALUES    (?,?,?,?,?)`, [firstName, lastName, username, userMail, passwordHaash]);
        if (!data){
            return res.status(404).send({
                success: false,
                message: "Error en la consulta INSERT"
            })
        }
        res.status(201).send({
            success: true,
            message: "Nuevo usuario creado",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error al crear el usuario",
            error
        })
    }
};

// Update User By ID
const updateUser = async (req,res) => {
    try {
        const userID = req.params.id;
        if (!userID){
            return res.status(404).send({
                success: false,
                message: "ID no válido"
            })
        }
        const { firstName, lastName, username, userMail, userPassword } = req.body;
        const data = await db.query(`UPDATE users SET firstName = ?, lastName = ?, username = ?, userMail = ?, userPassword = ? WHERE id = ?`, [firstName, lastName, username, userMail, userPassword, userID]);
        if (!data){
            return res.status(500).send({
                success: false,
                message: "Error al actualizar los datos"
            })
        }
        res.status(200).send({
            success: true,
            message: "Usuario actualizado correctamente"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error al actualizar el usuario",
            error
        })
    }
}

const deleteUser = async (req,res) => {
    try {
        const userID = req.params.id;
        if (!userID){
            return res.status(404).send({
                success: false,
                message: "Ingrese un ID válido"
            })
        }
        await db.query(`DELETE FROM users WHERE id = ?`, [userID]);
        res.status(200).send({
            success: true,
            message: "Usuario eliminado correctamente"
        })
    } catch (error) {
        req.status(500).send({
            success: false,
            message: "Error al eliminar el usuario",
            error
        })
    }
}

const loginUser = async (req,res) => {
    try {
        const userMail = req.body.userMail;
        const userPassword = req.body.userPassword;
        // let passwordHaash = await bcrypt.hash(userPassword, 8);
        if (!userMail || !userPassword){
            return res.status(404).send({
                success: false,
                message: "Por favor ingrese todos los campos"
            })
        }
        let validUser = false;
        const data = await db.query(`SELECT * FROM users WHERE userMail = ?`, [userMail]);
        const user = data[0][0];
        // console.log(user);
        // console.log(user.userPassword);
        // console.log(userPassword);
        const compare = bcrypt.compareSync(userPassword, user.userPassword);
        
        if (user && !compare) {
            validUser = false;
        } else {
            validUser = true;
        }

        if (validUser) {
            return res.status(200).send({
                    success: true,
                    jwt: "para login del frontend",
                    data: user
                })
        } else {
            return res.status(404).send({
                success: false,
                message: "Usuario o contraseña incorrectos"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error al iniciar sesión",
            error
        })
    }
}

module.exports = { getUsers, getUserByID, createUser, updateUser, deleteUser, loginUser };