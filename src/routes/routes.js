const express = require("express");
const fs = require('fs');
const { getAll } = require('../controllers/getAll');
const { get } = require('../controllers/get');
const { post } = require('../controllers/post');
const { put } = require('../controllers/put');
const { del } = require("../controllers/delete");

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
    try {
        post(req, res);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar os veículos.' });
    };
});

router.put('/:id', (req, res) => {
    try {
        put(req, res);
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