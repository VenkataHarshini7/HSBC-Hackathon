const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // from Neon or .env
});
module.exports = pool;
