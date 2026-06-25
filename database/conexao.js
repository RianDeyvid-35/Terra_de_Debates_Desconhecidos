// database/conexao.js
const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: path.resolve(__dirname, 'database.db'), // Cria o arquivo na pasta database
   logging: false 
});

// O próprio sequelize cria as tabelas baseadas nos seus Models
sequelize.sync()
   .then(() => console.log('Banco de dados sincronizado com sucesso!'))
   .catch(err => console.error('Erro ao sincronizar banco:', err));

module.exports = sequelize;