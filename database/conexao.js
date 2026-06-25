// database/conexao.js
const { Sequelize } = require('sequelize');

// Importa o driver oficial do Turso
const libsqlDriver = require('@libsql/sqlite3'); 

const sequelize = new Sequelize({
   dialect: 'sqlite', // O Sequelize exige que seja 'sqlite' aqui
   storage: 'SUA_URL_DO_TURSO_AQUI?authToken=SEU_TOKEN_AQUI', // Coloque sua URL e Token do Turso juntos aqui
   dialectModule: libsqlDriver, // Força o Sequelize a usar o Turso em vez do arquivo local
   logging: false
});

sequelize.sync() 
   .then(() => console.log('Conectado ao Turso com sucesso!'))
   .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;