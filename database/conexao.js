// database/conexao.js

// Mantenha os parênteses completamente vazios. 
// Assim, o Sequelize apenas verifica se o banco existe, sem apagar nenhum dado.
sequelize.sync() 
   .then(() => console.log('Conectado ao Turso com sucesso!'))
   .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;