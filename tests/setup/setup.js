// tests/setup/setup.js
const { beforeEach } = require('vitest');
const sequelize = require('../../database/conexao');

beforeEach(async () => {
   // O force: true limpa o banco e recria as tabelas do zero antes de cada caso de teste
   await sequelize.sync({ force: true }); 
});