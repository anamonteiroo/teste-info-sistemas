const fs = require('fs');

const dataFilePath = 'src/models/veiculos.json';

const get = (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler os veículos.' });
        }

            const veiculos = JSON.parse(data);
            res.json(veiculos);
        
    });
};

module.exports = { get };