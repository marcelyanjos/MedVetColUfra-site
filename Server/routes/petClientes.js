const express = require("express");
const router = express.Router();

const pool = require("../db");

// todos os pets
router.get('/', async (req, res) => {
    try {
      const query = 'SELECT * FROM pet_cliente';
      const { rows } = await pool.query(query);
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar os animais dos clientes.');
    }
  });

module.exports = router;