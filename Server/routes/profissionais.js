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
router.get("/:matricula", async (req, res) => {
  const { matricula } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM profissionais WHERE matricula = $1",[matricula])
    if (rows.length === 0) {
      res.status(400).send("Parâmetros inválidos.");
    } else {
      res.send(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar profissional.");
  }
});

router.post("/", async (req, res) => {
  const { matricula, nome, data_nasc, profissao, id_servicos } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO profissionais (matricula, nome, data_nasc, profissao, id_servicos) VALUES ($1, $2, $3, $4, $5)",
      [
        matricula,
        nome.toUpperCase(),
        data_nasc,
        profissao.toUpperCase(),
        id_servicos,
      ]
    );

    // Checa se a propriedade rowCount para inserir foi um sucesso
    if (result.rowCount > 0) {
      const insertedMatricula = matricula;
      res.send({ matricula: insertedMatricula });
    } else {
      res.status(500).send("Erro ao cadastrar profissional (matricula).");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar profissional.");
  }
});


module.exports = router;
