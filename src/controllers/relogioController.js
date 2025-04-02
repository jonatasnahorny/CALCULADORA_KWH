const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo relógio principal
exports.createRelogio = async (req, res) => {
  try {
    const { nome, referencia, kwh_fatura, valor_fatura, observacao } = req.body;

    const novoRelogio = await prisma.relogio_principal.create({
      data: { nome, referencia, kwh_fatura, valor_fatura, observacao },
    });

    res.status(201).json(novoRelogio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o relógio principal' });
  }
};


// Buscar todos os relógios principais
exports.getAllRelogios = async (req, res) => {
  try {
    const relogios = await prisma.relogio_principal.findMany();
    res.json(relogios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os relógios principais' });
  }
};

// Buscar um relógio principal pelo ID
exports.getRelogioById = async (req, res) => {
  try {
    const { id } = req.params;
    const relogio = await prisma.relogio_principal.findUnique({
      where: { id: parseInt(id) },
    });

    if (!relogio) {
      return res.status(404).json({ error: 'Relógio principal não encontrado' });
    }

    res.json(relogio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o relógio principal' });
  }
};

// Atualizar um relógio principal
exports.updateRelogio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, referencia, kwh_fatura, valor_fatura, observacao } = req.body;

    const relogioAtualizado = await prisma.relogio_principal.update({
      where: { id: parseInt(id) },
      data: { nome, referencia, kwh_fatura, valor_fatura, observacao },
    });

    res.json(relogioAtualizado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o relógio principal' });
  }
};

// Deletar um relógio principal
exports.deleteRelogio = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.relogio_principal.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Relógio principal excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o relógio principal' });
  }
};
