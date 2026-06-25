
// database/conexao.js
const { Sequelize } = require('sequelize');
const libsqlDriver = require('@libsql/sqlite3'); 

// Aqui o código puxa as credenciais que você cadastrou lá no painel do Render
const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

const sequelize = new Sequelize({
   dialect: 'sqlite',
   // Junta a URL e o Token em uma conexão segura
   storage: `${tursoUrl}?authToken=${tursoToken}`, 
   dialectModule: libsqlDriver, 
   logging: false
});

// Apenas avisa no console do Render se a ponte deu certo
sequelize.sync() 
   .then(() => console.log('Conectado ao Turso com sucesso! 🎉'))
   .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;