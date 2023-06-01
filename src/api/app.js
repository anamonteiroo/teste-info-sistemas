const express = require('express');
const bodyParser = require('body-parser');
const routes = require('../routes/routes');

const app = express();
app.use(bodyParser.json());

app.use('/veiculos', routes);

module.exports = app