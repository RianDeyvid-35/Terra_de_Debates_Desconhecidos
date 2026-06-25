// database/conexao.js
const { Sequelize } = require('sequelize');
const path = require('path');

// AJUSTE AQUI: Adicionamos o .sqlite3 no final para entregar o construtor exato que o Sequelize está procurando
const sqlite3Native = require('@sequelize/sqlite3').sqlite3; 

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: path.resolve(__dirname, 'database.db'), // Cria o arquivo na pasta database
   dialectModule: sqlite3Native,                   // Mantém o driver que colocou o site online
   logging: false 
});

// O próprio sequelize cria as tabelas baseadas nos seus Models
sequelize.sync()
   .then(() => console.log('Banco de dados sincronizado com sucesso!'))
   .catch(err => console.error('Erro ao sincronizar banco:', err));

module.exports = sequelize;