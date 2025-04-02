require('dotenv').config();
const express = require('express');
const relogioRoutes = require('./routes/relogioRoutes');
const subRelogioRoutes = require('./routes/subRelogioRoutes'); 

const app = express();

// Permite enviar JSON no corpo da requisição
app.use(express.json());

// Usar as rotas
app.use('/', relogioRoutes);
app.use('/', subRelogioRoutes); // Corrigir aqui para usar a rota correta

// servidor rodando
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
