// database/conexao.js
const { Sequelize } = require('sequelize');
const path = require('path');

// IMPORTAÇÃO CORRETA: Adicionamos o .sqlite3 no final para entregar o construtor exato que o Sequelize precisa
const sqlite3Native = require('@sequelize/sqlite3').sqlite3; 

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: path.resolve(__dirname, 'database.db'), // Mantém o banco na sua pasta database
   dialectModule: sqlite3Native,                   // Usa o driver nativo compatível com o Node 22 do Railway
   logging: false 
});

// Sincroniza as tabelas automaticamente
sequelize.sync()
   .then(() => console.log('Banco de dados sincronizado com sucesso!'))
   .catch(err => console.error('Erro ao sincronizar banco:', err));

module.exports = sequelize;