// const pg = require('pg');

// const client = new pg.Client({
//     user: 'wnupmfxhafrgdy',
//     host: 'ec2-3-217-251-77.compute-1.amazonaws.com',
//     database: 'da5fjefrkmtve7',
//     password: 'f38fc5f4a90bae2984ddfe13eab785e02b51c978824e8e546fb5103b10aba6fc',
//     port: 5432 
// })
// module.exports = client

// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const port = 3000

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

// app.get('/', (request, response) => {
//     response.json({ info: 'Node.js, Express, and Postgres API' })
//   })

//   app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
//   })

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./Queries')
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/usuarios', db.getUsers)
app.get('/usuarios/:id', db.getUserById)
app.post('/usuarios', db.createUser)
app.put('/usuarios/:id', db.updateUser)
app.delete('/usarios/:id', db.deleteUser)

app.get('/pets',db.getPets)
app.get('/pets/:id',db.getPetsById)
app.put('/pets/:id',db.updatePet)
app.delete('/pets/:id',db.deletePet)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})