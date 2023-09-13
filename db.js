const sqlite3 = require('sqlite3').verbose();

// Create an SQLite database connection (you can specify a file path if needed)
const db = new sqlite3.Database(':memory:'); // For in-memory database

db.serialize(() => {
  // Create your SQLite schema and perform any necessary setup here
  db.run(`
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      email TEXT UNIQUE
    )
  `);
});

module.exports = db;
