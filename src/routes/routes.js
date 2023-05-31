const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();

const dataFilePath = 'src/models/veiculos.json';

router.get('/', (req, res) => {
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

router.get('/:id', (req, res) => {
    const veiculoId = req.params.id;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler os veículos.' });
        }

        try {
            const veiculos = JSON.parse(data);
            const veiculo = veiculos.find(v => v.id === veiculoId);

            if (!veiculo) {
                return res.status(404).json({ error: 'Veículo não encontrado.' });
            }

            res.json(veiculo);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao processar os veículos.' });
        }
    });
});

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