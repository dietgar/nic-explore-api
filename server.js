const express = require('express');

// Rest Object
const app = express();

// Routes
app.get('/test', (req, res) => {
    res.status(200).send('<h1>HOLA</h1>');
})

// Port
const PORT = 8000

// Listen
app.listen(PORT, () => {
    console.log("Server Running");
})