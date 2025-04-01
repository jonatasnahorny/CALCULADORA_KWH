require('dotenv').config();
const express = require('express');
const relogioRoutes = require('./routes/relogioRoutes');
const leituraSubRelogioRoutes = require('./routes/leituraSubRelogioRoutes');
const faturaRoutes = require('./routes/faturaRoutes'); // Importando fatura

const app = express();

// Permite enviar JSON no corpo da requisição
app.use(express.json());

// Usar as rotas
app.use('/api', relogioRoutes);
app.use('/api', subRelogioRoutes);

//servidor rodando
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
