const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Configure Dotenv
dotenv.config();

const mySqlPool = require('./config/db');

// Rest Object
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/api/v1/users', require('./routes/usersRoutes'));

app.get('/', (req, res) => {
    res.status(200).send('<h1>NIC-EXPLORE API</h1>');
})

// Port
const PORT = process.env.PORT || 8000;

// Conditionally Listen
mySqlPool.query('SELECT 1').then(() => {
    // MySQL Connected
    console.log('Estoy dentro'.bgBlue.white);

    // Listen
    app.listen(PORT, () => {
        console.log(`Server Running on port ${process.env.PORT}`.bgMagenta.white);
    })
})
