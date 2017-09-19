const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('../auth/config');
const yelpConfig = require('../auth/yelpConfig');
const router = require('express').Router();
const User = require('../db/models/User');
const db = require('../db');
const bodyParser = require('body-parser');
const PythonShell = require('python-shell');
const fs = require('fs');
const YelpApi = require('yelp-api-v3');
const Promise = require('bluebird');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// register Facebook Passport strategy
passport.use(new facebookStrategy(facebookConfig, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    // find the user in the database based on their facebook name
    User.findOne({ fbID: profile.id }, (err, user) => {
      // if there is an error, stop everything and return an error connecting to db
      if (err) {
        console.log('user not found');
        return done(err);
      }
      // if user is found, then log them in
      if (user) {
        console.log('user found');
        return done(null, user//otherwise, create new user
        );
      } else {
        let newUser = new User();

        newUser.fbID = profile.id;
        newUser.user = profile.displayName;
        newUser.photo = profile.photos[0].value;

        newUser.save((err) => {
          if (err) {
            throw err;
          }
          console.log('user added');
          return done(null, newUser);
        });
      }
    });
  });
}));

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', {authType: 'rerequest'}));

// handle callback after facebook has authenticated the user
router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/auth/facebook'}),
// redirect user back to mobile app using Linking with custom protocol: localit
(req, res) => {
  res.redirect('localit://login?user=' + JSON.stringify(req.user));
});

router.post('/python', (req, res) => {
  //console.log('in python. \n yelp: ', req.body.yelp, '\nuser: ', req.body.user);
  fs.writeFile('Yelp.json', JSON.stringify(req.body.yelp), 'utf8', function() {
    console.log('writing second json');
    fs.writeFile('User.json', req.body.user, 'utf8', function() 
      console.log('Running in /python');
      PythonShell.run('knnfilter.py', function (err, results) {
        if (err) throw err;

        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        res.json(results);
      });
    });
  });
});

// end user session upon logout
router.get('/logout', (req, res) => {
  req.logout();
  delete req.session;
  res.send('Bye Bye user!');
});

// get a user from DB
router.get('/api/:user', (req, res) => {
  let user = req.params.user;
  console.log(user);
  User.findOne({ fbID: user }, (err, user) => {
    if (err) { return console.error(err) }
    res.json(user);
  });
});

router.post('/api/itinerary/:user', (req, res) => {
  const user = req.params.user;
  const itineraryName = req.body.itineraryName;
  const interests = req.body.interests;
  User.findOne({ fbID: user }, (err, user) => {
    if (err) return console.error(err);
    user.itineraryByCity.push({
      name: itineraryName,
      itineraryList: interests
    });
    user.save((err, thing) => {
      if (err) return console.log(err);
      res.json(thing);
    });
  })
})

router.put('/api/:user', (req, res) => {
  let city = req.body.city;
  let user = req.params.user;
  let business = req.body.business;
  console.log('user', user);
  User.findOne({ fbID: user }, (err, user) => {
    if (err) return console.error(err);
    if (req.body.liked === 'true') {
      // iterate through each city
      if (user.interestsByCity.length > 0) {

        var cityExists = false;
        user.interestsByCity.forEach((element) => {
          // if city equals city
          if (element.city === city) {
            cityExists = true;
            // then push business into it's interests
            element.interests.push(business);
          }
        });
        if (!cityExists) {
          user.interestsByCity.push({city: city, interests: business, dislikedInterests: []});
        }
      } else {
        user.interestsByCity.push({city: city, interests: business, dislikedInterests: []});
      }
    } else {
      if (user.interestsByCity.length > 0) {
        var cityExists = false;
        user.interestsByCity.forEach((element) => {
          // if city equals city
          if (element.city === city) {
            cityExists = true;
            // then push business into it's interests
            element.dislikedInterests.push(business);
          }
        });
        console.log('this should be true, ', cityExists)
        if (!cityExists) {
          user.interestsByCity.push({city: city, interests: [], dislikedInterests: business});
        }
      } else {
        user.interestsByCity.push({city: city, interests: [], dislikedInterests: business});
      }
    }
    user.save((err, thing) => {
      if (err)
        return console.log(err);
      res.json(thing);
    });
  });
});

//TODO: create API to save itinerary list
router.put('/api/interests/:user', (req, res) => {
  let user = req.params.user;
  let itineraryName = req.body.itineraryName;
  let savedInterests = [
    {
      "id": "the-secret-alley-san-francisco",
      "name": "The Secret Alley",
      "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/pvoI5obHw_5Ck1w7EdANYg/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/the-secret-alley-san-francisco?adjust_creative=f0bC-kYRtkbeuExDdacDNw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=f0bC-kYRtkbeuExDdacDNw",
      "review_count": 12,
      "categories": [
        {
          "alias": "galleries",
          "title": "Art Galleries"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 37.7552719116211,
        "longitude": -122.41877746582
      },
      "transactions": [],
      "price": "$",
      "location": {
        "address1": "",
        "address2": "",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94110",
        "country": "US",
        "state": "CA",
        "display_address": ["San Francisco, CA 94110"]
      },
      "phone": "+14155538944",
      "display_phone": "(415) 553-8944",
      "distance": 2095.273453772
    }, {
      "id": "magowans-infinite-mirror-maze-san-francisco",
      "name": "Magowan's Infinite Mirror Maze",
      "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/E8XZJCG7h4yCndNzqVdJJg/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/magowans-infinite-mirror-maze-san-francisco?adjust_creative=f0bC-kYRtkbeuExDdacDNw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=f0bC-kYRtkbeuExDdacDNw",
      "review_count": 296,
      "categories": [
        {
          "alias": "arts",
          "title": "Arts & Entertainment"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 37.810114,
        "longitude": -122.410287
      },
      "transactions": [],
      "location": {
        "address1": "Pier 39",
        "address2": "Bldg O-11",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94133",
        "country": "US",
        "state": "CA",
        "display_address": ["Pier 39", "Bldg O-11", "San Francisco, CA 94133"]
      },
      "phone": "+14158350019",
      "display_phone": "(415) 835-0019",
      "distance": 5935.9794571719995
    }, {
      "id": "exploratorium-san-francisco-2",
      "name": "Exploratorium",
      "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Sse9XcaERbw5iBIxN-Q6Yw/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/exploratorium-san-francisco-2?adjust_creative=f0bC-kYRtkbeuExDdacDNw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=f0bC-kYRtkbeuExDdacDNw",
      "review_count": 800,
      "categories": [
        {
          "alias": "venues",
          "title": "Venues & Event Spaces"
        }, {
          "alias": "museums",
          "title": "Museums"
        }
      ],
      "rating": 4.5,
      "coordinates": {
        "latitude": 37.800875,
        "longitude": -122.398619
      },
      "transactions": [],
      "location": {
        "address1": "Pier 15",
        "address2": "",
        "address3": "",
        "city": "San Francisco",
        "zip_code": "94111",
        "country": "US",
        "state": "CA",
        "display_address": ["Pier 15", "San Francisco, CA 94111"]
      },
      "phone": "+14155284444",
      "display_phone": "(415) 528-4444",
      "distance": 5550.88966181
    }
  ];
  let savedItinerary = {
      name: itineraryName,
      itineraryList: savedInterests
  };
  console.log('savedItinerary: ', user);
  User.findOne({ fbID: user }, (err, user) => {
    if (err) { return console.error(err) }
    user.itineraryByCity.push(savedItinerary);
    user.save((err, thing) => {
      if (err) return console.log(err);
      console.log(thing);
      res.json(thing);
    })
  });
});

router.post('/api/yelp', (req, res) => {
  console.log('props: ', req.body);
  var credentials = {
    app_id: yelpConfig.appId,
    app_secret: yelpConfig.appSecret
  };
  const yelp = new YelpApi(credentials);
  let lat = req.body.latitude;
  let lng = req.body.longitude;
  let latlng = String(lat) + ',' + String(lng);
  let title = req.body.title;
  let userdata = null;
  let userid = req.body.fbID;
  let params = {
    term: title,
    location: latlng,
    limit: '15',
  };
  console.log('params: ', params);
  yelp.search(params)
  .then((data) => {
    console.log('yelp: results')
    User.findOne({ fbID: userid }, (err, usercheck) => {
    if (err) {return console.error(err)}
    if (usercheck.interestsByCity.length > 0) {
        if (usercheck.interestsByCity[0].interests.length > 3 && usercheck.interestsByCity[0].dislikedInterests.length > 3) {
            console.log('yelpdata: ', data);
            console.log('userdata: ', usercheck);
            fs.writeFile('Yelp.json', data, 'utf8', function() {
              console.log('writing second json')
              fs.writeFile('User.json', JSON.stringify(usercheck), 'utf8', function() {
                PythonShell.run('knnfilter.py', function (err, results) {
                  if (err) throw err;
                  // results is an array consisting of messages collected during execution
                  console.log('results: %j', results);
                  res.json(results);
                });
              });
            });
        } else {
          res.json(data.businesses);
        }
      } else {
        res.json(data.businesses);
      }
  });
  })
  .catch((err) => console.log(err))
})



module.exports = {
  router,
  passport
};
