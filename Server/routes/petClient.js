const express = require("express");
const router = express.Router();

const pool = require("../db");

// todos os animais do cliente
router.get("/", async (req, res) => {
  const { id_cliente, nome, especie, sexo } = req.query;
  try {
    let query = "SELECT * FROM pet_cliente WHERE 1 = 1";
    const values = [];

    if (id_cliente) {
      const index = values.length + 1;
      query += ` AND id_cliente = $${index}`;
      values.push(id_cliente);
    }

    if (nome) {
      const index = values.length + 1;
      query += ` AND nome = $${index}`;
      values.push(nome);
    }

    if (especie) {
      const index = values.length + 1;
      query += ` AND especie = $${index}`;
      values.push(especie);
    }

    if (sexo) {
      const index = values.length + 1;
      query += ` AND sexo = $${index}`;
      values.push(sexo);
    }

    const { rows } = await pool.query(query, values);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os pets dos clientes.");
  }
});

// Rota para obter informações do animal do cliente
router.get("/:id_pet", async (req, res) => {
  const { id_pet } = req.params;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM pet_cliente WHERE id_pet = $1",
      [id_pet]
    );
    if (rows.length === 0) {
      res.status(400).send("Parâmetros inválidos.");
    } else {
      res.send(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os pets do cliente.");
  }
});

// Rota para obter os pets de um cliente
router.get("/:id_cliente", async (req, res) => {
  const { id_cliente } = req.params;

  try {
    const { rows } = await pool.query(
      "SELECT * FROM pet_cliente WHERE id_cliente = $1",
      [id_cliente]
    );
    if (rows.length === 0) {
      res.status(400).send("Parâmetros inválidos.");
    } else {
      res.send(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os pets do cliente.");
  }
});

// Rota para cadastrar um novo pet de um cliente
router.post("/", async (req, res) => {
  const { id_cliente, nome, idade, especie, peso, sexo } = req.body;
  try {
    const { rows: petRows } = await pool.query(
      "INSERT INTO pet_cliente (id_cliente, nome, idade, especie, peso, sexo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_pet",
      [
        id_cliente,
        nome.toUpperCase(),
        idade.toUpperCase(),
        especie.toUpperCase(),
        peso,
        sexo.toUpperCase(),
      ]
    );
    const id_pet = petRows[0].id_pet;
    res.send({ id_pet });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o pet do cliente.");
  }
});

module.exports = router;
