// initDB.js
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

const schema = fs.readFileSync('./schema.sql', 'utf8');

db.exec(schema, (err) => {
  if (err) {
    console.error("Error creating tables:", err.message);
  } else {
    console.log("Tables created successfully.");
  }
  db.close();
});
