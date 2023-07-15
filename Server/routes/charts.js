const express = require("express");
const router = express.Router();

const pool = require("../db");
const { Buffer } = require("buffer");

// Rota para listar animais por espécie e status de adoção
router.get("/", async (req, res) => {
  const { especie, adotado } = req.query;

  try {
    let query = "SELECT * FROM animais_canil";
    const values = [];

    if (especie) {
      query += " WHERE especie = $1";
      values.push(especie.toUpperCase());
    }

    if (adotado) {
      const index = values.length + 1;
      query += values.length
        ? " AND adotado = $" + index
        : " WHERE adotado = $" + index;
      values.push(adotado);
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

module.exports = router;
