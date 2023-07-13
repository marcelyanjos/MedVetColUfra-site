const express = require('express');
const router = express.Router();

const pool = require('../db');

// Rota para verificar a disponibilidade de horário
router.get('/', async (req, res) => {
  const { dia, id_servicos, hora } = req.query;
  try {
    const query = `
      SELECT COUNT(DISTINCT e.matricula) AS profissionais_escalados, COUNT(DISTINCT a.id_agendamento) AS agendamentos
      FROM escala e
      LEFT JOIN profissionais p ON p.matricula = e.matricula
      LEFT JOIN agendamento_cliente a ON a.id_servicos = p.id_servicos AND a.dia = e.dia AND a.hora = $3
      WHERE e.dia = $1 AND p.id_servicos = $2
    `;
    const values = [dia, id_servicos, hora];
    const { rows } = await pool.query(query, values);
    const profissionaisEscalados = parseInt(rows[0].profissionais_escalados);
    const agendamentos = parseInt(rows[0].agendamentos);
    const info = { agendamentos: agendamentos, vagas: profissionaisEscalados - agendamentos }
    if (agendamentos >= profissionaisEscalados) {
      res.send({ informações: info, disponibilidade: 'indisponivel' });
    } else {
      res.send({ informações: info, disponibilidade: 'disponivel' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao verificar a disponibilidade.');
  }
});

module.exports = router;
