const { Pool } = require('pg');
const dontenv = require('dotenv');

dontenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};