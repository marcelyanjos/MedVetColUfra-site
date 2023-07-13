const express = require('express');
const router = express.Router();

const pool = require('../db');

// Rota para verificar a disponibilidade de horário
router.get('/', async (req, res) => {
    const { dia, id_servicos } = req.query;
    try {
      const query = `
        SELECT p.id_servicos, COUNT(DISTINCT e.matricula) AS profissionais_escalados, COUNT(DISTINCT a.id_agendamento) AS agendamentos
        FROM escala e
        LEFT JOIN profissionais p ON p.matricula = e.matricula
        LEFT JOIN agendamento_cliente a ON a.id_servicos = p.id_servicos AND a.dia = e.dia
        WHERE e.dia = $1 AND p.id_servicos = $2
        GROUP BY p.id_servicos
      `;
      const values = [dia, id_servicos];
      const { rows } = await pool.query(query, values);
      const disponibilidadeProfissionais = rows.map(row => ({
        id_servicos: row.id_servicos,
        profissionais_escalados: parseInt(row.profissionais_escalados),
        agendamentos: parseInt(row.agendamentos),
      }));
  
      res.send(disponibilidadeProfissionais);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao listar a disponibilidade dos profissionais.');
    }
  });
  
module.exports = router;
