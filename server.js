const express = require('express');
const mongoose = require('mongoose');
const app = express(); // Create an Express application instance

// Middleware to parse JSON requests (should be placed before routes)
app.use(express.json());

// mongoose connection
mongoose.connect('mongodb+srv://kimurgorbrian20:6979samz.@cluster0.pk6oubr.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// person model
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

const Person = mongoose.model('Person', personSchema);

// routes and handlers
// Create a new person
app.post('/api/person', (req, res) => {
  const { name, age, email } = req.body;
  const newPerson = new Person({ name, age, email }); // Create a new instance of the Person model

  newPerson.save()
    .then((person) => {
      res.status(201).json(person);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to create person' });
    });
});

// Retrieve details of a person
app.get('/api/person/:id', (req, res) => {
  const { id } = req.params;

  Person.findById(id)
    .then((person) => {
      if (!person) {
        res.status(404).json({ error: 'Person not found' });
      } else {
        res.status(200).json(person);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to retrieve person' });
    });
});

// Modify details of an existing person
app.put('/api/person/:id', (req, res) => {
  const { id } = req.params;
  const updatedPerson = req.body;

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then((person) => {
      if (!person) {
        res.status(404).json({ error: 'Person not found' });
      } else {
        res.status(200).json(person);
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to update person' });
    });
});

// Remove a person
app.delete('/api/person/:id', (req, res) => {
  const { id } = req.params;

  Person.findByIdAndRemove(id)
    .then((person) => {
      if (!person) {
        res.status(404).json({ error: 'Person not found' });
      } else {
        res.status(200).json({ message: 'Person removed successfully' });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to remove person' });
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
