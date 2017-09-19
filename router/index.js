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
  console.log('this is the bod', req.body);
  let user = req.params.user;
  let itineraryName = req.body.itineraryName;
  let savedInterests = req.body.savedInterests;
  let savedItinerary = {
      name: itineraryName,
      itineraryList: savedInterests
  };
  User.findOne({ fbID: user }, (err, user) => {
    if (err) { return console.error(err) }
    user.itineraryByCity.push(savedItinerary);
    user.save((err, thing) => {
      if (err) return console.log(err);
      res.json(thing);
    })
  });
});

//Handle Yelp data retreival and Python parsing

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
    User.findOne({ fbID: userid }, (err, usercheck) => {
    if (err) {return console.error(err)}
    if (usercheck.interestsByCity.length > 0) {
        if (usercheck.interestsByCity[0].interests.length > 3 && usercheck.interestsByCity[0].dislikedInterests.length > 3) {
            fs.writeFile('Yelp.json', data, 'utf8', function() {
              console.log('writing second json')
              fs.writeFile('User.json', JSON.stringify(usercheck), 'utf8', function() {
                PythonShell.run('knnfilter.py', function (err, results) {
                  if (err) throw err;
                  // results is an array consisting of messages collected during execution
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
