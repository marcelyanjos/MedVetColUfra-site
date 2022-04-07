const Pool = require('pg').Pool
const pool = new Pool({
  user: 'wnupmfxhafrgdy',
  host: 'ec2-3-217-251-77.compute-1.amazonaws.com',
  database: 'da5fjefrkmtve7',
  password: 'f38fc5f4a90bae2984ddfe13eab785e02b51c978824e8e546fb5103b10aba6fc',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM usuarios', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM usuarios WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createUser = (request, response) => {
    const { nome, email } = request.body
  
    pool.query('INSERT INTO usuarios (nome, email) VALUES ($1, $2)', [nome, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }
  
  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { nome, email } = request.body
  
    pool.query(
      'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3',
      [nome, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }
  
  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM usuarios WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }