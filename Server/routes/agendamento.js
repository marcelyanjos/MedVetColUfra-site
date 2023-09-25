const express = require('express');
const router = express.Router(); 

const pool = require('../db');

// Rota para listar agendamentos
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM agendamento_cliente';
    const { rows } = await pool.query(query);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar agendamentos.');
  }
})

// Rota para cadastrar um novo agendamento
router.post('/', async (req, res) => {
  const { id_servicos, id_cliente, id_pet, dia, hora, motivo, situacao } = req.body;
  try {
    const { rows: agendamentoRows } = await pool.query(
      'INSERT INTO agendamento_cliente (id_servicos, id_cliente, id_pet, dia, hora, motivo, situacao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_agendamento',
      [id_servicos, id_cliente, id_pet, dia, hora, motivo, situacao],
    );
    const id_agendamento = agendamentoRows[0].id_agendamento;
    res.send({ id_agendamento });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar o agendamento.');
  }
});
  
// Rota para listar agendamentos do cliente
router.get('/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;
  
  try {
    const { rows } = await pool.query('SELECT * FROM agendamento_cliente WHERE id_cliente = $1',[id_cliente]);
  if (rows.length===0) {
    res.status(400).send('Parâmetros inválidos.');
  }else{
    res.send(rows);
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar agendamento do cliente.');
  }
})

// Rota para listar agendamentos do cliente
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const { rows } = await pool.query('SELECT * FROM agendamento_cliente WHERE id_agendamento = $1',[id]);
  if (rows.length===0) {
    res.status(400).send('Parâmetros inválidos.');
  }else{
    res.send(rows);
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar agendamento.');
  }
})

module.exports = router;
