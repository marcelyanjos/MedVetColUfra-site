const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { Buffer } = require('buffer');

// Configurações do banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medvetufra',
  password: 'root',
  port: 5432,
});

const app = express();

// Habilita o uso do CORS
app.use(cors());

// Configura o Body Parser para interpretar corretamente os dados enviados no corpo das requisições
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Rota para listar todos os animais
app.get('/api/animals', async (req, res) => {
  const { species, minAge, maxAge, gender } = req.query;

  try {
    let query = 'SELECT * FROM animais_canil';
    const values = [];

    if (species) {
      query += ' WHERE especie = $1';
      values.push(species);
    }

    if (minAge) {
      const index = values.length + 1;
      query += values.length ? ' AND idade >= $' + index : ' WHERE idade >= $' + index;
      values.push(minAge);
    }

    if (maxAge) {
      const index = values.length + 1;
      query += values.length ? ' AND idade <= $' + index : ' WHERE idade <= $' + index;
      values.push(maxAge);
    }

    if (gender) {
      const index = values.length + 1;
      query += values.length ? ' AND sexo = $' + index : ' WHERE sexo = $' + index;
      values.push(gender);
    }

    const { rows } = await pool.query(query, values);

    // Converte o buffer data para base64 string
    rows.forEach(row => {
      if (row.imagem) {
        row.imagem = Buffer.from(row.imagem).toString('base64');
      }
    });

    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os animais.');
  }
});

// Rota para buscar um animal pelo ID
app.get('/api/animals/:id_animal', async (req, res) => {
  const { id_animal } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM animais_canil WHERE id_animal = $1', [id_animal]);
    if (rows.length === 0) {
      res.status(404).send('Animal não encontrado.');
    } else {
      const row = rows[0];
      // Converte o buffer data para base64 string
      if (row.imagem) {
        row.imagem = Buffer.from(row.imagem).toString('base64');
      }
      res.send(row);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar o animal.');
  }
});

// Rota para cadastrar um novo animal
app.post('/api/animals', async (req, res) => {
  const { nome, especie, sexo, idade, peso, imagem } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO animais_canil (nome, especie, sexo, idade, peso, imagem) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_animal',
      [nome.toUpperCase(), especie.toUpperCase(), sexo.toUpperCase(), idade, peso, imagem],
    );
    const id_animal = rows[0].id_animal;
    res.send({ id_animal });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar o animal.');
  }
});

// Rota para atualizar informações de um animal pelo ID
app.put('/api/animals/:id_animal', async (req, res) => {
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

// Rota para listar todos os formularios de adoção
app.get('/api/adoption-forms/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM formularios_adocao WHERE id_cliente = $1', [id_cliente]);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao listar formularios.');
  }
});

// Rota para listar todos os formularios de adoção
app.get('/api/adoption-forms', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM formularios_adocao');
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao listar formularios.');
  }
});

// Rota para cadastrar um novo formulário de adoção
app.post('/api/adoption-forms', async (req, res) => {
  const { id_cliente, id_animal, tipo_moradia, ocupacao, protocolo, situacao, data_envio } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO formularios_adocao (id_cliente, id_animal, tipo_moradia, ocupacao, protocolo, situacao, data_envio) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_formulario',
      [id_cliente, id_animal, tipo_moradia, ocupacao.toUpperCase(), protocolo, situacao, data_envio],
    );
    const id_formulario = rows[0].id_formulario;
    res.send({ id_formulario });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar o formulário de adoção.');
  }
});

// Rota para buscar um cliente por nome, data de nascimento e email
app.get('/api/clientes', async (req, res) => {
  const { nome, data_nasc, email } = req.query;
  try {
    let query = 'SELECT * FROM cliente';
    const values = [];

    if (nome) {
      const index = values.length + 1;
      query += values.length ? ' AND nome = $' + index : ' WHERE nome = $' + index;
      values.push(nome);
    }

    if (data_nasc) {
      const index = values.length + 1;
      query += values.length ? ' AND data_nasc = $' + index : ' WHERE data_nasc = $' + index;
      values.push(data_nasc); // converte data_nasc para Date
    }

    if (email) {
      const index = values.length + 1;
      query += values.length ? ' AND email = $' + index : ' WHERE email = $' + index;
      values.push(email);
    }

    const { rows } = await pool.query(query, values);

    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os clientes.');
  }
});

app.get('/api/clientes/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id_cliente]);
    if (rows.length === 0) {
      res.status(404).send('Cliente não encontrado.');
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar o cliente.');
  }
});

// Rota para cadastrar um novo cliente
app.post('/api/clientes', async (req, res) => {
  const { nome, data_nasc, email } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO cliente (nome, data_nasc, email) VALUES ($1, $2, $3) RETURNING id_cliente',
      [nome.toUpperCase(), data_nasc, email],
    );
    const id_cliente = rows[0].id_cliente;
    res.send({ id_cliente });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar o cliente.');
  }
});

// Rota para obter os serviços disponíveis
app.get('/api/servicos', async (req, res) => {
  try {
    const query = 'SELECT * FROM servicos';
    const { rows } = await pool.query(query);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os serviços.');
  }
});

app.get('/api/servicos/:id_servicos', async (req, res) => {
  const { id_servicos } = req.params;

  try {
    const { rows } = await pool.query('SELECT * FROM servicos WHERE id_servicos = $1', [id_servicos]);
    if (rows.length === 0) {
      res.status(400).send('Parâmetros inválidos.');
    } else {
      res.send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar serviço.');
  }
});

// Rota para verificar a disponibilidade dos profissionais e agendamentos
app.get('/api/disponibilidade', async (req, res) => {
  const { dia, id_servicos, hora } = req.query;
  try {
    const query = `
      SELECT COUNT(DISTINCT e.matricula) AS profissionais_escalados, COUNT(DISTINCT a.id_agendamento) AS agendamentos
      FROM escala e
      LEFT JOIN profissionais p ON p.matricula = e.matricula
      LEFT JOIN agendamento_cliente a ON a.id_servicos = p.id_servicos AND a.dia = e.dia AND a.hora = $3
      WHERE e.dia = $1 AND p.id_servicos = $2
    `;
    const values = [dia, id_servicos, hora];
    const { rows } = await pool.query(query, values);
    const profissionaisEscalados = parseInt(rows[0].profissionais_escalados);
    const agendamentos = parseInt(rows[0].agendamentos);
    const info = { agendamentos: agendamentos, vagas: profissionaisEscalados - agendamentos }
    if (agendamentos >= profissionaisEscalados) {
      res.send({ informações: info, disponibilidade: 'indisponivel' });
    } else {
      res.send({ informações: info, disponibilidade: 'disponivel' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao verificar a disponibilidade.');
  }
});

app.get('/api/disponibilidade-profissionais', async (req, res) => {
  const { dia, id_servicos } = req.query;
  try {
    const query = `
      SELECT p.id_servicos, COUNT(DISTINCT e.matricula) AS profissionais_escalados, COUNT(DISTINCT a.id_agendamento) AS agendamentos
      FROM escala e
      LEFT JOIN profissionais p ON p.matricula = e.matricula
      LEFT JOIN agendamento_cliente a ON a.id_servicos = p.id_servicos AND a.dia = e.dia
      WHERE e.dia = $1 AND p.id_servicos = $2
      GROUP BY p.id_servicos
    `;
    const values = [dia, id_servicos];
    const { rows } = await pool.query(query, values);
    const disponibilidadeProfissionais = rows.map(row => ({
      id_servicos: row.id_servicos,
      profissionais_escalados: parseInt(row.profissionais_escalados),
      agendamentos: parseInt(row.agendamentos),
    }));

    res.send(disponibilidadeProfissionais);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao listar a disponibilidade dos profissionais.');
  }
});

// Rota para cadastrar um novo agendamento
app.post('/api/agendamentos', async (req, res) => {
  const { id_servicos, id_cliente, id_pet, dia, hora, motivo, situacao } = req.body;
  try {
    const { rows: agendamentoRows } = await pool.query(
      'INSERT INTO agendamento_cliente (id_servicos, id_cliente, id_pet, dia, hora, motivo, situacao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_agendamento',
      [id_servicos, id_cliente, id_pet, dia, hora, motivo, situacao],
    );
    const id_agendamento = agendamentoRows[0].id_agendamento;
    res.send({ id_agendamento });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar o agendamento.');
  }
});

app.get('/api/agendamentos', async (req, res) => {
  try {
    const query = 'SELECT * FROM agendamento_cliente';
    const { rows } = await pool.query(query);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar agendamentos.');
  }
})

app.get('/api/agendamentos/:id_cliente', async (req, res) => {
  const { id_cliente } = req.params;
  
  try {
    const { rows } = await pool.query('SELECT * FROM agendamento_cliente WHERE id_cliente = $1',[id_cliente]);
  if (rows.length===0) {
    res.status(400).send('Parâmetros inválidos.');
  }else{
    res.send(rows[0]);
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar agendamento do cliente.');
  }
})

// Rota para cadastrar um novo pet de um cliente
app.post('/api/petCliente', async (req, res) => {
  const { id_cliente, nome, idade, especie, peso, sexo } = req.body;
  try {
    const { rows: petRows } = await pool.query(
      'INSERT INTO pet_cliente (id_cliente, nome, idade, especie, peso, sexo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_pet',
      [id_cliente, nome.toUpperCase(), idade.toUpperCase(), especie.toUpperCase(), peso, sexo.toUpperCase()],
    );
    const id_pet = petRows[0].id_pet;
    res.send({ id_pet });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar o pet do cliente.');
  }
});


// todos os pets
app.get('/api/petsCliente', async (req, res) => {
  try {
    const query = 'SELECT * FROM pet_cliente';
    const { rows } = await pool.query(query);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os animais dos clientes.');
  }
});

// Rota para obter informações do animal do cliente
app.get('/api/petCliente/:id_pet', async (req, res) => {
  const { id_pet } = req.params;
  
  try {
    const { rows } = await pool.query('SELECT * FROM pet_cliente WHERE id_pet = $1',[id_pet]);
  if (rows.length===0) {
    res.status(400).send('Parâmetros inválidos.');
  }else{
    res.send(rows);
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os pets do cliente.');
  }
});

// Rota para obter os pets de um cliente
app.get('/api/petCliente/:id_cliente', async (req, res) => {
  const { id_cliente} = req.params;
  
  try {
    const { rows } = await pool.query('SELECT * FROM pet_cliente WHERE id_cliente = $1',[id_cliente]);
  if (rows.length===0) {
    res.status(400).send('Parâmetros inválidos.');
  }else{
    res.send(rows);
  }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar os pets do cliente.');
  }
});

app.get('/api/petCliente', async (req, res) => {
  const { id_cliente, nome, especie, sexo } = req.query;
  try {
    let query = 'SELECT * FROM pet_cliente WHERE 1 = 1';
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
    res.status(500).send('Erro ao buscar os pets dos clientes.');
  }
});



// Inicia o servidor na porta 3000
app.listen(3001, () => console.log('Servidor iniciado na porta 3001.'));