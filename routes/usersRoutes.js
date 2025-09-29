const express = require('express');
const { getUsers, getUserByID, createUser, updateUser, deleteUser, loginUser } = require('../controllers/userController');

// Router Object
const router = express.Router();

// Routes

// Get All Users
router.get('/getall', getUsers);

// Get Stundent By ID
router.get('/get/:id', getUserByID);

// Create New User || POST
router.post('/create', createUser);

// Update User || PUT
router.put('/update/:id', updateUser);

// Delete User || DELETE
router.delete('/delete/:id', deleteUser);

// Login User || POST
router.post('/auth', loginUser)

module.exports = router;