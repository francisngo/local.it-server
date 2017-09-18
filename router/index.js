const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('../auth/config');
const router = require('express').Router();
const User = require('../db/models/User');
const db = require('../db');
const bodyParser = require('body-parser');
const PythonShell = require('python-shell');
const fs = require('fs');
const Promise = require('bluebird');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// register Facebook Passport strategy
passport.use(new facebookStrategy(facebookConfig,
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
      // find the user in the database based on their facebook name
      User.findOne({ fbID: profile.id }, (err, user) => {
        // console.log('====================================');
        // console.log(profile)
        // console.log('====================================');
        // if there is an error, stop everything and return an error connecting to db
        if (err) {
          console.log('user not found');
          return done(err);
        }
        // if user is found, then log them in
        if (user) {
          console.log('user found');
          return done(null, user);
        }
        //otherwise, create new user
        else {
          const newUser = new User();

          newUser.fbID = profile.id;
          newUser.user = profile.displayName;
          newUser.photo = profile.photos[0].value;

          newUser.save((err) => {
            if (err) { throw err; }
            console.log('user added');
            return done(null, newUser);
          });
        }
      });
    });
  }
));

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', { authType: 'rerequest' }));

// handle callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // redirect user back to mobile app using Linking with custom protocol: localit
  (req, res) => {
    // console.log('...redirecting...');
    // console.log('user: ', req.user);
    // res.send(req.user);
    res.redirect('localit://login?user=' + JSON.stringify(req.user));
  }
);

router.post('/python', (req, res) => {
  //console.log('in python. \n yelp: ', req.body.yelp, '\nuser: ', req.body.user);
  fs.writeFile('Yelp.json', JSON.stringify(req.body.yelp), 'utf8', function() {
    console.log('writing second json')
    fs.writeFile('User.json', req.body.user, 'utf8', function() {
      PythonShell.run('knnfilter.py', function (err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('results: %j', results);
        res.json(results);
      });
    }
  );
  });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    req.logout();
    res.redirect('localit://login?user=' + JSON.stringify(req.user));
  });
});

// get a user from DB
router.get('/api/:user', (req, res) => {
  var user = req.params.user;
  console.log(user);
  User.findOne({ fbID: user }, (err, user) => {
    if (err) {return console.error(err)}
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
  var city = req.body.city;
  var user = req.params.user;
  var business = req.body.business;
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
          user.interestsByCity.push({
            city: city,
            interests: business,
            dislikedInterests: []
          });
        }
      } else {
        user.interestsByCity.push({
          city: city,
          interests: business,
          dislikedInterests: []
        });
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
          user.interestsByCity.push({
            city: city,
            interests: [],
            dislikedInterests: business
          });
        }
      } else {
        user.interestsByCity.push({
          city: city,
          interests: [],
          dislikedInterests: business
        });
      }
    }
    user.save((err, thing) => {
      if (err) return console.log(err);
      res.json(thing);
    });
  });
});

module.exports = {
  router,
  passport
};
