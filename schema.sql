DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS institutions;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'client', 'user')) NOT NULL
);

CREATE TABLE institutions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  api_url TEXT
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  institution_id INTEGER REFERENCES institutions(id),
  account_type TEXT,
  balance NUMERIC
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  account_id INTEGER REFERENCES accounts(id),
  transaction_date DATE,
  description TEXT,
  amount NUMERIC,
  category TEXT
);
