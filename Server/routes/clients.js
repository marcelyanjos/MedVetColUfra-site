const express = require("express");
const router = express.Router();

const pool = require("../db");
const { Buffer } = require("buffer");

// Rota para listar todos os clientes
// router.get('/', async (req, res) => {
//   try {
//     const { rows } = await pool.query('SELECT * FROM cliente');
//     res.send(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Erro ao buscar os clientes.');
//   }
// });

// Rota para buscar um cliente por nome, data de nascimento e email
router.post("/", async (req, res) => {
  const { nome, data_nasc, email } = req.body;
 
  try {
    let query = "SELECT * FROM cliente";
    
    let values = [];

    if (nome) {
      const index = values.length + 1;
      query += values.length
        ? " AND nome = $" + index
        : " WHERE nome = $" + index;
      values.push(nome.toUpperCase());
    }

    if (data_nasc) {
      const index = values.length + 1;
      query += values.length
        ? " AND data_nasc = $" + index
        : " WHERE data_nasc = $" + index;
      values.push(data_nasc); // converte data_nasc para Date
    }

    if (email) {
      const index = values.length + 1;
      query += values.length
        ? " AND email = $" + index
        : " WHERE email = $" + index;
      values.push(email);
    }

    const { rows } = await pool.query(query, values);

    res.send(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar os clientes.");
  }
});

// router.get('/:id', async (req, res) => {
//   const { id_cliente } = req.params;
//   try {
//     const { rows } = await pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id_cliente]);
//     if (rows.length === 0) {
//       res.status(404).send('Cliente não encontrado.');
//     } else {
//       const row = rows[0];
//       res.send(row);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Erro ao buscar o cliente.');
//   }
// });

// Rota para obter um cliente pelo ID
router.get("/:id_cliente", async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM cliente WHERE id_cliente = $1",
      [id_cliente]
    );
    if (rows.length === 0) {
      res.status(404).send("Cliente não encontrado.");
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar o cliente.");
  }
});

// Rota para cadastrar um novo cliente
router.post("/addclient", async (req, res) => {
  const { nome, data_nasc, email } = req.body;
  try {
    const { rows } = await pool.query(
      "INSERT INTO cliente (nome, data_nasc, email) VALUES ($1, $2, $3) RETURNING id_cliente",
      [nome.toUpperCase(), data_nasc, email]
    );
    const id_cliente = rows[0].id_cliente;
    res.send({ id_cliente });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar o cliente.");
  }
});

// Rota para atualizar um cliente
router.put("/:id_cliente", async (req, res) => {
  const { id_cliente } = req.params;
  const { nome, data_nasc, email } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE cliente SET nome = $1, data_nasc = $2, email = $3 WHERE id_cliente = $4",
      [nome.toUpperCase(), data_nasc, email, id_cliente]
    );
    if (rows.length === 0) {
      return res.status(404).send("Cliente não encontrado.");
    }
    res.send({ message: "Cliente atualizado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar o cliente.");
  }
});


module.exports = router;
