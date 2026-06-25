const { Sequelize } = require('sequelize');

// 1. AQUI VOCÊ COLOCA A SUA CONEXÃO DO TURSO DE VOLTA
// (Substitua pelos dados que você estava usando para conectar no Turso)
const sequelize = new Sequelize('libsql://database-riandeyvid-35.aws-us-east-2.turso.io', {
   dialect: 'sqlite', 
   // ... qualquer outro dialectModule ou configuração que você usou para o Turso
});

// 2. O sync vazio, para não recriar as tabelas nem apagar os dados
sequelize.sync() 
   .then(() => console.log('Conectado ao Turso com sucesso!'))
   .catch(err => console.error('Erro ao conectar ao banco:', err));

// 3. Exporta a conexão
module.exports = sequelize;