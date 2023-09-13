const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Import the sqlite3 module
const app = express();
const port = process.env.PORT || 3000;

// Create an SQLite database connection (in-memory for testing)
const db = new sqlite3.Database(':memory:'); // For in-memory database
// You can use a file-based database by specifying a file path:
// const db = new sqlite3.Database('my-database.db');

app.use(express.json());

// Create a person table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      email TEXT UNIQUE
    )
  `);
});

// Define your routes and handlers here

// Create a new person
app.post('/api/person', (req, res) => {
  const { name, age, email } = req.body;
  db.run(
    'INSERT INTO person (name, age, email) VALUES (?, ?, ?)',
    [name, age, email],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create person' });
      }
      res.status(201).json({ id: this.lastID, name, age, email });
    }
  );
});

// Retrieve details of a person
app.get('/api/person/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM person WHERE id = ?', [id], (err, person) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve person' });
    }
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json(person);
  });
});

// Modify details of an existing person
app.put('/api/person/:id', (req, res) => {
  const { id } = req.params;
  const updatedPerson = req.body;
  db.run(
    'UPDATE person SET name = ?, age = ?, email = ? WHERE id = ?',
    [updatedPerson.name, updatedPerson.age, updatedPerson.email, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update person' });
      }
      res.status(200).json({ id, ...updatedPerson });
    }
  );
});

// Remove a person
app.delete('/api/person/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM person WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to remove person' });
    }
    res.status(200).json({ message: 'Person removed successfully' });
  });
});

// Export the Express app for testing
module.exports = app;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
