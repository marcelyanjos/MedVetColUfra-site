const express = require("express");
const router = express.Router();

const pool = require("../db");

// Rota para obter os serviços disponíveis
router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM escala";
    const { rows } = await pool.query(query);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os escalas.");
  }
});

router.get("/:matricula", async (req, res) => {
  const { matricula } = req.params;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM escala WHERE matricula = $1",
      [matricula]
    );
    if (rows.length === 0) {
      res.status(400).send("Parâmetros inválidos.");
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar escalas.");
  }
});

router.post("/", async (req, res) => {
  const { dia, matricula } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO escala (dia, matricula) VALUES ($1, $2) RETURNING id_escala",
      [dia, matricula]
    );
    const id_escala = rows[0].id_escala;
    res.send({ id_escala });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar escala.");
  }
});

module.exports = router;
