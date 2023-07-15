const express = require("express");
const router = express.Router();

const pool = require("../db");

// todos os animais do cliente
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM formularios_adocao WHERE data_adocao IS NOT NULL";
    const { rows } = await pool.query(query);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar adoções.");
  }
});


module.exports = router;
