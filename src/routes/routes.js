const express = require("express");
const fs = require('fs');
const { getAll } = require('../controllers/getAll');
const { get } = require('../controllers/get');

const router = express.Router();

const dataFilePath = 'src/models/veiculos.json';

router.get('/', (req, res) => {
    try {
        getAll(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar os veículos.' });
    }
});

router.get('/:id', (req, res) => {
    try {
        get(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar os veículos.' });
    }
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

router.put('/:id', (req, res) => {
    const veiculoId = req.params.id;
    const updatedVeiculo = req.body;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler os veículos.' });
        }

        try {
            const veiculos = JSON.parse(data);
            const index = veiculos.findIndex(v => v.id === veiculoId);

            if (index === -1) {
                return res.status(404).json({ error: 'Veículo não encontrado.' });
            }

            veiculos[index] = { ...veiculos[index], ...updatedVeiculo };

            fs.writeFile(dataFilePath, JSON.stringify(veiculos), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao atualizar o veículo.' });
                }

                res.json(veiculos[index]);
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao processar os veículos.' });
        }
    });
});

router.delete('/:id', (req, res) => {
    const veiculoId = req.params.id;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler os veículos.' });
        }

        try {
            const veiculos = JSON.parse(data);
            const index = veiculos.findIndex(v => v.id === veiculoId);

            if (index === -1) {
                return res.status(404).json({ error: 'Veículo não encontrado.' });
            }

            const deletedVeiculo = veiculos.splice(index, 1)[0];

            fs.writeFile(dataFilePath, JSON.stringify(veiculos), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao excluir o veículo.' });
                }

                res.json({ "message": "Veículo deletado" });
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao processar os veículos.' });
        }
    });
});

module.exports = router;