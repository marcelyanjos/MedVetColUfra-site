const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'medvetufra',
  password: 'root',
  port: 5432,
});

module.exports = pool;
