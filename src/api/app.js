const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/carros', async (req, res) => {
    return console.log('Hello, world!');
});

module.exports = app