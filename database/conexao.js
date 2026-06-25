// database/conexao.js
const { Sequelize } = require('sequelize');
const path = require('path');
// 1. Importa o módulo offline que você instalou
const sqlite3Offline = require('sqlite3-offline'); 

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: path.resolve(__dirname, 'database.db'), // Cria o arquivo na pasta database
   dialectModule: sqlite3Offline, // <-- 2. ESSA LINHA RESOLVE O ERRO NO RAILWAY!
   logging: false 
});

// O próprio sequelize cria as tabelas baseadas nos seus Models
sequelize.sync()
   .then(() => console.log('Banco de dados sincronizado com sucesso!'))
   .catch(err => console.error('Erro ao sincronizar banco:', err));

module.exports = sequelize;