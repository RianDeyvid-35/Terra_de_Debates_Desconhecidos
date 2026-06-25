// database/conexao.js
const { Sequelize } = require('sequelize');
const libsqlDriver = require('@libsql/sqlite3'); 

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

// Alerta extra para te ajudar no console do Render
if (!tursoUrl || !tursoToken) {
   console.error("❌ ERRO CRÍTICO: As variáveis TURSO_DATABASE_URL ou TURSO_AUTH_TOKEN não foram encontradas no ambiente!");
}

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: `${tursoUrl}?authToken=${tursoToken}`, 
   dialectModule: libsqlDriver, 
   logging: false
});

// ... resto do código do sync e exports