const { Sequelize } = require('sequelize');
const libsqlDriver = require('@libsql/sqlite3'); 

// --- CORREÇÃO DEFINITIVA DE COMPATIBILIDADE (TURSO + SEQUELIZE V6) ---
// O Sequelize utiliza Statements para ler índices e tabelas. Precisamos clonar os objetos
// retornados pelo driver do Turso (libsql) tanto no Database quanto no Statement,
// pois eles vêm congelados por padrão, impedindo que o Sequelize injete propriedades novas.

function descongelar(rows) {
    if (Array.isArray(rows)) {
        return rows.map(row => row && typeof row === 'object' ? { ...row } : row);
    }
    if (rows && typeof rows === 'object') {
        return { ...rows };
    }
    return rows;
}

// Aplica o patch nos métodos de consulta do Database
['all', 'get'].forEach(method => {
    const original = libsqlDriver.Database.prototype[method];
    if (typeof original === 'function') {
        libsqlDriver.Database.prototype[method] = function (sql, ...args) {
            const callback = args[args.length - 1];
            if (typeof callback === 'function') {
                args[args.length - 1] = function (err, rows) {
                    callback.call(this, err, descongelar(rows));
                };
            }
            return original.apply(this, [sql, ...args]);
        };
    }
});

// Aplica o patch nos métodos do Statement (Onde o Sequelize realmente busca os dados)
['all', 'get'].forEach(method => {
    const original = libsqlDriver.Statement.prototype[method];
    if (typeof original === 'function') {
        libsqlDriver.Statement.prototype[method] = function (...args) {
            const callback = args[args.length - 1];
            if (typeof callback === 'function') {
                args[args.length - 1] = function (err, rows) {
                    callback.call(this, err, descongelar(rows));
                };
            }
            return original.apply(this, args);
        };
    }
});
// ---------------------------------------------------------------------

const isTestEnv = process.env.NODE_ENV === 'test' || typeof vitest !== 'undefined';
const tursoUrl = process.env.TURSO_DATABASE_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

// Configuração Inteligente do Sequelize
const sequelize = new Sequelize({
   dialect: 'sqlite',
   // Se o Vitest estiver rodando, usa banco em memória isolado. Caso contrário, usa o Turso local/produção.
   storage: isTestEnv ? ':memory:' : `${tursoUrl}?authToken=${tursoToken}`, 
   dialectModule: libsqlDriver, 
   logging: false
});

sequelize.sync() 
   .then(() => console.log(isTestEnv ? 'Conectado ao banco de testes em memória! 🧪' : 'Conectado ao Turso com sucesso! 🎉'))
   .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;