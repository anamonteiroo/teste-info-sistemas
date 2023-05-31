const fs = require('fs');

const dataFilePath = 'src/models/veiculos.json';

const get = (req, res) => {
    const veiculoId = req.params.id;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler os veículos.' });
        };

        const veiculos = JSON.parse(data);
        const veiculo = veiculos.find(v => v.id === veiculoId);

        if (!veiculo) {
            return res.status(404).json({ error: 'Veículo não encontrado.' });
        };

        res.json(veiculo);
    });
};

module.exports = get;