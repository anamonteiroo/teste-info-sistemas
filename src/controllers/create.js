const fs = require('fs');

const dataFilePath = 'src/models/veiculos.json';

const create = (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        const newVeiculo = req.body;

        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erro ao ler os veículos.' });
            };

                const veiculos = JSON.parse(data);
                veiculos.push(newVeiculo);

                fs.writeFile(dataFilePath, JSON.stringify(veiculos), err => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Erro ao salvar o veículo.' });
                    };

                    res.status(201).json(newVeiculo);
                });
        });
    });
};

module.exports =  create;