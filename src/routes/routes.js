const express = require("express");
const getAll = require('../controllers/getAll');
const get = require('../controllers/get');
const create = require('../controllers/create');
const update = require('../controllers/update');
const del = require("../controllers/delete");

const router = express.Router();

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
    try {
        create(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar os veículos.' });
    };
});

router.put('/:id', (req, res) => {
    try {
        update(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar os veículos.' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        del(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar os veículos.' });
    }
});

module.exports = router;