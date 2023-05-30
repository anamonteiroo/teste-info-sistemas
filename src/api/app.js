const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const dataFilePath = 'src/models/veiculos.json';

app.get('/veiculos', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao ler os veículos.' });
      }
  
      try {
        const veiculos = JSON.parse(data);
        res.json(veiculos);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar os veículos.' });
      }
    });
  });

module.exports = app