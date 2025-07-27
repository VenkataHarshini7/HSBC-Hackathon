const express = require('express');
const pool = require('./db');
const app = express();
app.use(express.json());

app.get('/api/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
});

// add endpoints for accounts, transactions, dashboard data, etc.

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
