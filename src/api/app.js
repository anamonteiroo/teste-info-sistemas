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

app.get('/veiculos/:id', (req, res) => {
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

app.post('/veiculos', (req, res) => {
    const newVeiculo = req.body;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler os veículos.' });
        }

        try {
            const veiculos = JSON.parse(data);
            veiculos.push(newVeiculo);

            fs.writeFile(dataFilePath, JSON.stringify(veiculos), err => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Erro ao salvar o veículo.' });
                }

                res.status(201).json(newVeiculo);
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Erro ao processar os veículos.' });
        }
    });
});

app.put('/veiculos/:id', (req, res) => {
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

app.delete('/veiculos/:id', (req, res) => {
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

module.exports = app