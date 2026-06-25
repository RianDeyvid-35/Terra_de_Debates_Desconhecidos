// database/conexao.js
const { Sequelize } = require('sequelize');
const libsqlDriver = require('@libsql/sqlite3'); 

// --- CORREÇÃO DE COMPATIBILIDADE (TURSO + SEQUELIZE V6) ---
// Intercepta os dados do Turso e os clona para que o Sequelize possa modificá-los
const originalAll = libsqlDriver.Database.prototype.all;
libsqlDriver.Database.prototype.all = function (sql, ...args) {
    const callback = args[args.length - 1];
    if (typeof callback === 'function') {
        args[args.length - 1] = function (err, rows) {
            if (rows && Array.isArray(rows)) {
                rows = rows.map(row => ({ ...row })); // Descongela as linhas do banco
            }
            callback(err, rows);
        };
    }
    return originalAll.call(this, sql, ...args);
};

const originalGet = libsqlDriver.Database.prototype.get;
libsqlDriver.Database.prototype.get = function (sql, ...args) {
    const callback = args[args.length - 1];
    if (typeof callback === 'function') {
        args[args.length - 1] = function (err, row) {
            if (row && typeof row === 'object') {
                row = { ...row }; // Descongela uma linha única
            }
            callback(err, row);
        };
    }
    return originalGet.call(this, sql, ...args);
};
// -----------------------------------------------------------

const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

const sequelize = new Sequelize({
   dialect: 'sqlite',
   storage: `${tursoUrl}?authToken=${tursoToken}`, 
   dialectModule: libsqlDriver, 
   logging: false
});

sequelize.sync() 
   .then(() => console.log('Conectado ao Turso com sucesso! 🎉'))
   .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;