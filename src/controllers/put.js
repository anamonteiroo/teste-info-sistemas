const fs = require('fs');

const dataFilePath = 'src/models/veiculos.json';

const put = (req, res) => {
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
};

module.exports = { put };