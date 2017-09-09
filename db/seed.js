// create db connection
const db = require('./index');

// require User schema
const User = require('./models/User');

// clear database
User.collection.drop();

// seed data
const seedUser = User({
  fbID: '0100205207988687',
  user: 'John Smith',
  token: 'EAAMZAxlKQaYsBAJa1R7zvOoHZCf2mpz3qTWNhN1owMxhM1ViCEkcLJLKCHiB4eD0dJobOV3lrjqEzld1dVdAwfJHdZCizr1ELTCaTDfJZBYRhmzfIWF1cZBgZAKTIOXj7UtAEm41jjAgwD1AYPvnYFuqBi57MtN6EZD',
  photo: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16387256_10100135191637018_347784059648177463_n.jpg?oh=5e4947aa036e8676fed751f0e07cc83a&oe=5A5C5D21',
  interestsByCity: [
    {
      city: 'Los Angeles, CA',
      interests: [
        {
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
            "display_address": ["4334 W Sunset Blvd", "Los Angeles, CA 90029"]
          },
          "phone": "",
          "display_phone": "",
          "distance": 5097.226532784
        }
      ],
      dislikedInterests: [
        {
          "id": "pinks-hot-dogs-los-angeles-4",
          "name": "Pink's Hot Dogs",
          "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Dc1bruuyBZaHSthOaEM6PA/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/pinks-hot-dogs-los-angeles-4?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
          "review_count": 6287,
          "categories": [
            {
              "alias": "hotdog",
              "title": "Hot Dogs"
            }
          ],
          "rating": 3.5,
          "coordinates": {
            "latitude": 34.08403,
            "longitude": -118.34439
          },
          "transactions": [],
          "price": "$",
          "location": {
            "address1": "709 N La Brea Ave",
            "address2": "",
            "address3": "",
            "city": "Los Angeles",
            "zip_code": "90038",
            "country": "US",
            "state": "CA",
            "display_address": ["709 N La Brea Ave", "Los Angeles, CA 90038"]
          },
          "phone": "+13239314223",
          "display_phone": "(323) 931-4223",
          "distance": 3255.110146778
        }
      ]
    }
  ],
  itineraryByCity: [
    {
      name: 'Labor Day Fiesta',
      itineraryList: [
        {
          "id": "venice-beach-venice",
          "name": "Venice Beach",
          "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/I16LadYQPot1iuQacfRiNQ/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/venice-beach-venice?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
          "review_count": 488,
          "categories": [
            {
              "alias": "beaches",
              "title": "Beaches"
            }
          ],
          "rating": 4,
          "coordinates": {
            "latitude": 33.978504,
            "longitude": -118.467698
          },
          "transactions": [],
          "location": {
            "address1": "1500 Ocean Front Walk",
            "address2": "",
            "address3": "",
            "city": "Venice",
            "zip_code": "90291",
            "country": "US",
            "state": "CA",
            "display_address": ["1500 Ocean Front Walk", "Venice, CA 90291"]
          },
          "phone": "+13106503255",
          "display_phone": "(310) 650-3255",
          "distance": 16346.07603604
        }, {
          "id": "sidecar-doughnuts-and-coffee-santa-monica-3",
          "name": "Sidecar Doughnuts & Coffee",
          "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/wgqAz3xPWJJdWFZ3ccTGvg/o.jpg",
          "is_closed": false,
          "url": "https://www.yelp.com/biz/sidecar-doughnuts-and-coffee-santa-monica-3?adjust_creative=TJCJBQCAAm_aB5D00Y6-UQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=TJCJBQCAAm_aB5D00Y6-UQ",
          "review_count": 818,
          "categories": [
            {
              "alias": "donuts",
              "title": "Donuts"
            }, {
              "alias": "coffee",
              "title": "Coffee & Tea"
            }
          ],
          "rating": 4.5,
          "coordinates": {
            "latitude": 34.021437,
            "longitude": -118.49598
          },
          "transactions": [],
          "price": "$$",
          "location": {
            "address1": "631 Wilshire Blvd",
            "address2": "",
            "address3": "",
            "city": "Santa Monica",
            "zip_code": "90401",
            "country": "US",
            "state": "CA",
            "display_address": ["631 Wilshire Blvd", "Santa Monica, CA 90401"]
          },
          "phone": "+13105870022",
          "display_phone": "(310) 587-0022",
          "distance": 16695.42673522
        }
      ]
    }
  ]
});

//save seed data to db
seedUser.save((err, result) => {
  if (err) { throw err; }
  console.log('Seed data successfully', result);
});

//close db
db.close();
