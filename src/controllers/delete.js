const fs = require('fs');

const dataFilePath = 'src/models/veiculos.json';

const del = (req, res) => {
    const veiculoId = req.params.id;

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao ler os veículos.' });
        }

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

                res.json({ "message": "Veículo deletado." });
            });
    });
};

module.exports = { del };