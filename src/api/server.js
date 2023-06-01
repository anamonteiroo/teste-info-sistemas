const app = require('./app');

const PORT = 3000;

const server = app.listen(PORT, () => console.info(`conectado na porta ${PORT}`));

module.exports = server;