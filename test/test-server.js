const expect = require('chai').expect;
const request = require('request');
// require mongoose and schema
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: { type: String, required: true }
});
const Name = mongoose.model('Name', testSchema);

const User = require('../db/models/User');
const seed = require('./test-seed');

describe('MongoDB Testing', () => {

  //before, connect to database
  before((done) => {
    mongoose.connect('mongodb://localhost/local-it-testdb', {
      useMongoClient: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      done();
    });
  });

  describe('Create a User', () => {
    it('should create user, Francis', (done) => {
      const testUser = User({
        user: 'Francis',
        interestsByCity: [
          {
            city: 'Los Angeles, CA',
            interests: [seed.sampleBusiness1],
            dislikedInterests: [seed.sampleBusiness2]
          }
        ],
        itineraryByCity: [
          { name: 'party',
            itineraryList: [seed.sampleBusiness1, seed.sampleBusiness2]
          }
        ]
      });
      testUser.save(done);
    });

    it('should retrieve user, Francis', (done) => {
      User.find({}, (err, result) => {
        if (err) { throw err; }
        if (result.length === 0) { throw new Error('No data'); }
        // console.log(JSON.stringify(result));
        // console.log(JSON.stringify(result[0].user));
        expect(result[0].user).to.equal('Francis');
        done();
      });
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
})

// testing purposes only //
xdescribe('Basic Testing Setup', () => {
  describe('Node Server', () => {

    it('should load "Hello, world"', () => {
      request('http://localhost:3000', (error, response, body) => {
        expect(body).to.equal('Hello, world');
      });
    });

  });
});
xdescribe('Database Setup', () => {

  // before starting test, create sandboxed database connection
  // once a connection is established invoke done()
  before((done) => {
    mongoose.connect('mongodb://localhost/local-it-testdb', {
      useMongoClient: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Database connected sucessfully.');
      done();
    });
  });

  describe('Database connection', () => {
    // save object with 'name' value of 'Francis' to db
    it('should save name to database', (done) => {
      var testName = Name({
        name: 'Francis'
      });

      testName.save(done);
    });

    // dont save object with incorrect format to db
    it('should not save incorrect format to database', (done) => {
      var wrongName = Name({
        notName: 'not Francis'
      });

      wrongName.save((err) => {
        if (err) { return done(); }
        throw new Error('Should generate error');
      });
    });

    // retrieve data from db
    it('should retrieve data from test database', (done) => {
      Name.find({name: 'Francis'}, (err, name) => {
        if (err) { throw err; }
        if (name.length === 0) { throw new Error('No data'); }
        done();
      });
    });
  });

  //after db testing are finished drop database and close connection
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });

});
