const express = require("express");
const router = express.Router();

const pool = require("../db");

// Rota para listar todos os formularios de adoção
router.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM formularios_adocao");
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar formularios.");
  }
});

// Rota para listar todos os formularios de adoção
router.get("/:id_cliente", async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM formularios_adocao WHERE id_cliente = $1",
      [id_cliente]
    );
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar formularios.");
  }
});

// Rota para cadastrar um novo formulário de adoção
router.post("/", async (req, res) => {
  const {
    id_cliente,
    id_animal,
    tipo_moradia,
    ocupacao,
    protocolo,
    situacao,
    data_envio,
  } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO formularios_adocao (id_cliente, id_animal, tipo_moradia, ocupacao, protocolo, situacao, data_envio) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_formulario",
      [
        id_cliente,
        id_animal,
        tipo_moradia,
        ocupacao.toUpperCase(),
        protocolo,
        situacao,
        data_envio,
      ]
    );
    const id_formulario = rows[0].id_formulario;
    res.send({ id_formulario });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o formulário de adoção.");
  }
});


module.exports = router;

