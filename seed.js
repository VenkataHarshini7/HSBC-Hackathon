// seed.js
const { Client } = require('pg');
const faker = require('@faker-js/faker').faker;
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function seed() {
  try {
    await client.connect();

    // Drop tables
    await client.query(`DROP TABLE IF EXISTS outcomes`);
    await client.query(`DROP TABLE IF EXISTS properties`);
    await client.query(`DROP TABLE IF EXISTS users`);

    // Recreate tables
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        role TEXT
      )`);

    await client.query(`
      CREATE TABLE properties (
        id SERIAL PRIMARY KEY,
        title TEXT,
        location TEXT,
        price INTEGER,
        user_id INTEGER REFERENCES users(id)
      )`);

    await client.query(`
      CREATE TABLE outcomes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        property_id INTEGER REFERENCES properties(id),
        outcome_type TEXT,
        value TEXT
      )`);

    // Seed users
    const users = [];
    for (let i = 0; i < 50; i++) {
      const name = faker.person.fullName();
      const email = faker.internet.email();
      const role = i < 25 ? "broker" : "client";

      const res = await client.query(
        `INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING id`,
        [name, email, role]
      );
      users.push({ id: res.rows[0].id, role });
    }

    // Seed properties
    for (let i = 0; i < 100; i++) {
      const title = faker.location.streetAddress();
      const location = faker.location.city();
      const price = faker.number.int({ min: 100000, max: 1000000 });
      const broker = faker.helpers.arrayElement(users.filter(u => u.role === "broker"));

      await client.query(
        `INSERT INTO properties (title, location, price, user_id) VALUES ($1, $2, $3, $4)`,
        [title, location, price, broker.id]
      );
    }

    // Seed outcomes
    for (let i = 0; i < 200; i++) {
      const clientUser = faker.helpers.arrayElement(users.filter(u => u.role === "client"));
      const propertyId = faker.number.int({ min: 1, max: 100 });
      const outcomeType = faker.helpers.arrayElement(["interest", "visit_scheduled", "offer_made", "purchase_complete"]);
      const value = faker.lorem.sentence(6);

      await client.query(
        `INSERT INTO outcomes (user_id, property_id, outcome_type, value) VALUES ($1, $2, $3, $4)`,
        [clientUser.id, propertyId, outcomeType, value]
      );
    }

    console.log("PostgreSQL database seeded successfully.");
    await client.end();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
