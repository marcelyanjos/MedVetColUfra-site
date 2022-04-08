const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'wnupmfxhafrgdy',
  host: 'ec2-3-217-251-77.compute-1.amazonaws.com',
  database: 'da5fjefrkmtve7',
  password: 'f38fc5f4a90bae2984ddfe13eab785e02b51c978824e8e546fb5103b10aba6fc',
  port: 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
// Users
const getUsers = (request, response) => {
  pool.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM usuarios WHERE id = 1', id, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// const createUser = (request, response) => {
//   const { usuario, nome, senha } = request.body

//   pool.query('INSERT INTO usuarios (usuario, nome, senha) VALUES ($1, $2, $3)', [usuario, nome, senha], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${result.insertId}`)
//   })
// }
const createUser = (request, response) => {
  // var sql = ;
  const { usuario, nome, senha } = request.body
  pool.query("INSERT INTO usuarios (usuario, nome, senha) VALUES ('teste4', 'teste4', '12345600')", usuario, nome, senha ,function (err, result) {
    if (err) throw err;
    response.status(100).json(`User added with ID: ${result.id}`)
  });
};
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { nome, usuario, senha } = request.body;

  pool.query(
    "UPDATE usuarios SET nome = 'trocadenome', usuario = '2', senha = '112233' WHERE id = 15",
    nome, usuario,senha, id,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(`User modified with ID: ${results.id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM usuarios WHERE id = 14', id, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${results.id}`);
  });
};

// Pets
const getPets = (request, response) => {
  pool.query('SELECT * FROM pets', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getPetsById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM pets WHERE id_pet = 1', id, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// const createUser = (request, response) => {
//   const { usuario, nome, senha } = request.body

//   pool.query('INSERT INTO usuarios (usuario, nome, senha) VALUES ($1, $2, $3)', [usuario, nome, senha], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${result.insertId}`)
//   })
// }

const updatePet = (request, response) => {
  const id = parseInt(request.params.id);
  const { nome, usuario, senha } = request.body;

  pool.query(
    "UPDATE usuarios SET nome = 'trocadenome', usuario = '2', senha = '112233' WHERE id = 15",
    nome, usuario,senha, id,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(`User modified with ID: ${results.id}`);
    }
  );
};

const deletePet = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM usuarios WHERE id = 14', id, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${results.id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  
  getPets,
  getPetsById,
  updatePet,
  deletePet
};
