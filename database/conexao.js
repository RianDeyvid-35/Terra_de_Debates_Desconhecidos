// database/conexao.js
const { Sequelize } = require('sequelize');
const path = require('path');
// 1. Importa o driver nativo oficial do Sequelize
const sqlite3Native = require('@sequelize/sqlite3'); 

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: path.resolve(__dirname, 'database.db'), // Mantém o banco do professor
   dialectModule: sqlite3Native, // <-- 2. Força o Sequelize a usar o driver compatível com Node 22
   logging: false 
});

// Sincroniza as tabelas
sequelize.sync()
   .then(() => console.log('Banco de dados sincronizado com sucesso!'))
   .catch(err => console.error('Erro ao sincronizar banco:', err));

module.exports = sequelize;