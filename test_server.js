const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server'); // Replace with the path to your Express app
const db = require('./db'); // Import the SQLite database connection
const Person = require('./server'); // Import the SQLite Person model

chai.use(chaiHttp);
const expect = chai.expect;

describe('CRUD Operations', () => {
  before((done) => {
    // Connect to the SQLite test database using the imported connection from db.js
    db.serialize(() => {
      done();
    });
  });

  after((done) => {
    // Close the database connection after all tests
    db.close(() => {
      done();
    });
  });

  beforeEach((done) => {
    // Clear the database before each test
    db.run('DELETE FROM person', (err) => {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  describe('POST /api/person', () => {
    it('should create a new person', (done) => {
      const newPerson = {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
      };

      chai.request(app)
        .post('/api/person')
        .send(newPerson)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('name', 'John Doe');
          expect(res.body).to.have.property('age', 30);
          expect(res.body).to.have.property('email', 'john@example.com');
          done();
        });
    });
  });

  describe('GET /api/person/:id', () => {
    it('should retrieve a person by ID', (done) => {
      // Create a new person in the database
      db.run('INSERT INTO person (name, age, email) VALUES (?, ?, ?)', ['John Doe', 30, 'john@example.com'], function (err) {
        if (err) {
          return done(err);
        }

        const personId = this.lastID;

        chai.request(app)
          .get(`/api/person/${personId}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('name', 'John Doe');
            expect(res.body).to.have.property('age', 30);
            expect(res.body).to.have.property('email', 'john@example.com');
            done();
          });
      });
    });
  });

  describe('PUT /api/person/:id', () => {
    it('should update an existing person', (done) => {
      // Create a new person in the database
      db.run('INSERT INTO person (name, age, email) VALUES (?, ?, ?)', ['Bob', 35, 'bob@example.com'], function (err) {
        if (err) {
          return done(err);
        }

        const personId = this.lastID;

        const updatedPerson = {
          name: 'New Name',
          age: 40,
          email: 'new@example.com',
        };

        chai.request(app)
          .put(`/api/person/${personId}`)
          .send(updatedPerson)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('name', 'New Name');
            expect(res.body).to.have.property('age', 40);
            expect(res.body).to.have.property('email', 'new@example.com');
            done();
          });
      });
    });
  });

  describe('DELETE /api/person/:id', () => {
    it('should delete an existing person', (done) => {
      // Create a new person in the database
      db.run('INSERT INTO person (name, age, email) VALUES (?, ?, ?)', ['Charlie', 30, 'charlie@example.com'], function (err) {
        if (err) {
          return done(err);
        }

        const personId = this.lastID;

        chai.request(app)
          .delete(`/api/person/${personId}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message', 'Person removed successfully');
            done();
          });
      });
    });
  });
});
