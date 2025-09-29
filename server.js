const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');

// Configure Dotenv
dotenv.config();

// Rest Object
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/api/v1/users', require('./routes/usersRoutes'));

app.get('/', (req, res) => {
    res.status(200).send('<h1>HOLA</h1>');
})

// Port
const PORT = process.env.PORT || 8000;

// Contidionaly Listen
mySqlPool.query('SELECT 1').then(() => {
    // MySQL Connected
    console.log('Estoy dentro'.bgBlue.white);

    // Listen
    app.listen(PORT, () => {
        console.log(`Server Running on port ${process.env.PORT}`.bgMagenta.white);
    })
})
