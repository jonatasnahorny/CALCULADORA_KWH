const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar um novo sub-relógio
exports.createSubRelogio = async (req, res) => {
  try {
    const { id_relogio_principal, nome, referencia, kwh_acumulado, ativo, observacao } = req.body;

    // Verificar se o relógio principal existe
    const relogioExistente = await prisma.relogio_principal.findUnique({
      where: { id: id_relogio_principal },
    });

    if (!relogioExistente) {
      return res.status(400).json({ error: 'Relógio principal não encontrado' });
    }

    const novoSubRelogio = await prisma.sub_relogio.create({
      data: { id_relogio_principal, nome, referencia, kwh_acumulado, ativo, observacao },
    });

    res.status(201).json(novoSubRelogio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o sub-relógio' });
  }
};

// Buscar todos os sub-relógios (com nome do relógio principal)
exports.getAllSubRelogios = async (req, res) => {
  try {
    const subRelogios = await prisma.sub_relogio.findMany({
      include: { relogio_principal: true }, // Retorna os detalhes do relógio principal
    });
    res.json(subRelogios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar os sub-relógios' });
  }
};

// Buscar um sub-relógio pelo ID
exports.getSubRelogioById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const subRelogio = await prisma.sub_relogio.findUnique({
      where: { id },
      include: { relogio_principal: true }, // Retorna os detalhes do relógio principal
    });

    if (!subRelogio) {
      return res.status(404).json({ error: 'Sub-relógio não encontrado' });
    }

    res.json(subRelogio);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o sub-relógio' });
  }
};

// Atualizar um sub-relógio
exports.updateSubRelogio = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const { id_relogio_principal, nome, referencia, kwh_acumulado, ativo, observacao } = req.body;

    // Verificar se o relógio principal existe antes de atualizar
    if (id_relogio_principal) {
      const relogioExistente = await prisma.relogio_principal.findUnique({
        where: { id: id_relogio_principal },
      });

      if (!relogioExistente) {
        return res.status(400).json({ error: 'Relógio principal não encontrado' });
      }
    }

    const subRelogioAtualizado = await prisma.sub_relogio.update({
      where: { id },
      data: { id_relogio_principal, nome, referencia, kwh_acumulado, ativo, observacao },
    });

    res.json(subRelogioAtualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Sub-relógio não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao atualizar o sub-relógio' });
  }
};

// Deletar um sub-relógio
exports.deleteSubRelogio = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    await prisma.sub_relogio.delete({
      where: { id },
    });

    res.json({ message: `Sub-relógio ${id} excluído com sucesso` });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Sub-relógio não encontrado' });
    }
    res.status(500).json({ error: 'Erro ao excluir o sub-relógio' });
  }
};
