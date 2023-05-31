const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();

const dataFilePath = 'src/models/veiculos.json';

router.post('/', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        const newVeiculo = req.body;

        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao ler os veículos.' });
            };

            try {
                const veiculos = JSON.parse(data);
                veiculos.push(newVeiculo);

                fs.writeFile(dataFilePath, JSON.stringify(veiculos), err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Erro ao salvar o veículo.' });
                    };

                    res.status(201).json(newVeiculo);
                });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao processar os veículos.' });
            };
        });
    })
});

module.exports = router;