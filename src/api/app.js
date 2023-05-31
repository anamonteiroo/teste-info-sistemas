const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const routes = require('../routes/routes');

const app = express();
app.use(bodyParser.json());

const dataFilePath = 'src/models/veiculos.json';

app.use('/veiculos', routes);

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