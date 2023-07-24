const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM profissionais";
    const { rows } = await pool.query(query);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar adoções.");
  }
});

router.post("/", async (req, res) => {
  const { matricula, nome, data_nasc, profissao, id_servicos } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO profissionais (matricula, nome, data_nasc, profissao, id_servicos) VALUES ($1, $2, $3, $4, $5)",
      [
        matricula,
        nome.toUpperCase(),
        data_nasc,
        profissao.toUpperCase(),
        id_servicos,
      ]
    );
    const insertedMatricula = rows[0].matricula;
    res.send({ matricula: insertedMatricula });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar escala.");
  }
});

module.exports = router;
