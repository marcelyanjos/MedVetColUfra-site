const express = require('express');
const router = express.Router();

const pool = require('../db');

// Rota para obter os serviços disponíveis
router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM servicos';
    const { rows } = await pool.query(query);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os serviços.');
  }
});

router.get('/:id_servicos', async (req, res) => {
  const { id_servicos } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM servicos WHERE id_servicos = $1', [id_servicos]);
    if (rows.length === 0) {
      res.status(400).send('Parâmetros inválidos.');
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar serviço.');
  }
});

  module.exports = router;