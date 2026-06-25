// database/conexao.js
const { Sequelize } = require('sequelize');
const libsqlDriver = require('@libsql/sqlite3'); 

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;


const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: `${tursoUrl}?authToken=${tursoToken}`, 
   dialectModule: libsqlDriver, 
   logging: false
});

// Executa o sync de forma isolada para não afetar o que é exportado
sequelize.sync() 
   .then(() => console.log('Conectado ao Turso com sucesso! 🎉'))
   .catch(err => console.error('Erro ao conectar ao banco:', err));

// OBRIGATORIAMENTE SEPARADO NO FINAL DO ARQUIVO:
module.exports = sequelize;