const express = require("express");
const router = express.Router();

const pool = require("../db");
const { Buffer } = require("buffer");

// Rota para listar todos os animais
router.get("/", async (req, res) => {
  const { species, minAge, maxAge, gender } = req.query;

  try {
    let query = "SELECT * FROM animais_canil";
    const values = [];

    if (species) {
      query += " WHERE especie = $1";
      values.push(species);
    }

    if (minAge) {
      const index = values.length + 1;
      query += values.length
        ? " AND idade >= $" + index
        : " WHERE idade >= $" + index;
      values.push(minAge);
    }

    if (maxAge) {
      const index = values.length + 1;
      query += values.length
        ? " AND idade <= $" + index
        : " WHERE idade <= $" + index;
      values.push(maxAge);
    }

    if (gender) {
      const index = values.length + 1;
      query += values.length
        ? " AND sexo = $" + index
        : " WHERE sexo = $" + index;
      values.push(gender);
    }

    const { rows } = await pool.query(query, values);

    // Converte o buffer data para base64 string
    rows.forEach((row) => {
      if (row.imagem) {
        row.imagem = Buffer.from(row.imagem).toString("base64");
      }
    });

    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os animais.");
  }
});

// Rota para buscar um animal pelo ID
router.get("/:id_animal", async (req, res) => {
  const { id_animal } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM animais_canil WHERE id_animal = $1",
      [id_animal]
    );
    if (rows.length === 0) {
      res.status(404).send("Animal não encontrado.");
    } else {
      const row = rows[0];
      // Converte o buffer data para base64 string
      if (row.imagem) {
        row.imagem = Buffer.from(row.imagem).toString("base64");
      }
      res.send(row);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar o animal.");
  }
});

// Rota para cadastrar um novo animal
router.post("/", async (req, res) => {
  const { nome, especie, sexo, idade, peso, adotado, imagem } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO animais_canil (nome, especie, sexo, idade, peso, adotado, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_animal",
      [nome.toUpperCase(), especie.toUpperCase(), sexo.toUpperCase(), idade, peso, adotado, imagem],
    );
    const id_animal = rows[0].id_animal;
    res.send({ id_animal });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o animal.");
  }
});

// Rota para atualizar informações de um animal pelo ID
router.put('/:id_animal', async (req, res) => {
  const { id_animal } = req.params;
  const { nome, especie, sexo, idade, peso, imagem } = req.body;
  try {
    const { rowCount } = await pool.query(
      'UPDATE animais_canil SET nome=$1, especie=$2, sexo=$3, idade=$4, peso=$5, imagem=$6 WHERE id_animal=$7',
      [nome, especie, sexo, idade, peso, imagem, id_animal],
    );
    if (rowCount === 0) {
      res.status(404).send('Animal não encontrado.');
    } else {
      res.send('Informações do animal atualizadas com sucesso.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar informações do animal.');
  }
});
module.exports = router;
