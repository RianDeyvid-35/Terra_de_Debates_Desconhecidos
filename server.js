// server.js corrigido e padronizado
require('dotenv').config(); // Garante que lê as variáveis de ambiente do .env
const app = require('./app'); // Puxa o app já exportado corretamente

// Puxa a conexão do Sequelize (o que ativa a criação/sincronização automática do database.db)
const sequelize = require('./database/conexao'); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`--- Servidor do Fórum Académico rodando na porta ${PORT} ---`);
});