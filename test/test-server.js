const expect = require('chai').expect;
const request = require('request');
// require mongoose and schema
const mongoose = require('mongoose');
const User = require('../db/models/User');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: { type: String, required: true }
});
const Name = mongoose.model('Name', testSchema);

describe('Mongo db testing', () => {
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

  describe('Create a User', () => {
    it('should create Francis user', (done) => {
      const testUser = new User({
        user: 'Francis',
        interestsByCity: [{ city: 'Los Angeles, CA', interests: [sampleBusiness1],
          dislikedInterests: [sampleBusiness2] }],
        itineraryByCity: [{ name: 'party', itineraryList: [sampleBusiness1, sampleBusiness2] }]
      });
      testUser.save(done);
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



const sampleBusiness1 = {
  "id": "dinosaur-coffee-los-angeles",
  "name": "Dinosaur Coffee",
  "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/5CHIY8Iyu4S-uPHYiha9xQ/o.jpg",
  "is_closed": false,
  "url": "https://www.yelp.com/biz/dinosaur-coffee-los-angeles?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
  "review_count": 373,
  "categories": [
      {
          "alias": "coffee",
          "title": "Coffee & Tea"
      }
  ],
  "rating": 4,
  "coordinates": {
      "latitude": 34.0952683206945,
      "longitude": -118.283839609328
  },
  "transactions": [],
  "price": "$$",
  "location": {
      "address1": "4334 W Sunset Blvd",
      "address2": "",
      "address3": "",
      "city": "Los Angeles",
      "zip_code": "90029",
      "country": "US",
      "state": "CA",
      "display_address": [
          "4334 W Sunset Blvd",
          "Los Angeles, CA 90029"
      ]
  },
  "phone": "",
  "display_phone": "",
  "distance": 5097.226532784
}

const sampleBusiness2 = {
  "id": "coffee-commissary-los-angeles-2",
  "name": "Coffee Commissary",
  "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/vK0TFzDnnl4yPtJ33IdYJw/o.jpg",
  "is_closed": false,
  "url": "https://www.yelp.com/biz/coffee-commissary-los-angeles-2?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
  "review_count": 81,
  "categories": [
      {
          "alias": "coffee",
          "title": "Coffee & Tea"
      },
      {
          "alias": "bakeries",
          "title": "Bakeries"
      }
  ],
  "rating": 4,
  "coordinates": {
      "latitude": 34.098168357026,
      "longitude": -118.321811446915
  },
  "transactions": [],
  "price": "$",
  "location": {
      "address1": "6087 W Sunset Blvd",
      "address2": "",
      "address3": "",
      "city": "Los Angeles",
      "zip_code": "90028",
      "country": "US",
      "state": "CA",
      "display_address": [
          "6087 W Sunset Blvd",
          "Los Angeles, CA 90028"
      ]
  },
  "phone": "+13234673559",
  "display_phone": "(323) 467-3559",
  "distance": 4067.5997689039996
}
