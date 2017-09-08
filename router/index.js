const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const facebook = require('../auth/config');
const router = require('express').Router();
const User = require('../db/models/User');
const db = require('../db');
const bodyParser = require('body-parser');

// transform Facebook profile
const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

// register Facebook Passport strategy
passport.use(new Strategy(facebook,
  (accessToken, refreshToken, profile, cb) => {
    // TODO: save profile to db
    // User.findOrCreate({ facebookId: profile.id }, function(err, user) {
    //   return cb(err, user);
    // });
    console.log(profile);
    cb(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook'));

// handle callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // redirect user back to mobile app using Linking with custom protocol: localit
  (req, res) => {
    console.log('...redirecting...');
    console.log('user ', req.user);
    res.redirect('localit://login?user=' + JSON.stringify(req.user));
  }
);

router.get('/api/user'), (req, res) => {
  User.find((err, user) => {
    if (err) return console.error(err);
    res.json(user);
  })
}
router.get('/api/users', (req, res) => {
  User.find((err, user) => {
    res.json(user);
  })
});

router.put('/api/:user', (req, res) => {
  var city = req.body.city;
  var user = req.params.user;
  var business = req.body.business;
  User.findOne({ _id: user }, (err, user) => {
    if (err) return console.error(err);
    if (req.body.liked === 'true') {
      // iterate through each city
      user.interestsByCity.forEach((element) => {
        // if city equals city
        if (element.city === city) {
          // then push business into it's interests
          element.interests.push(business);
        }
      });
    } else {
      user.interestsByCity.forEach((element) => {
        // if city equals city
        if (element.city === city) {
          // then push business into it's interests
          element.dislikedInterests.push(business);
        }
      });
    }
    user.save((err, thing) => {
      if (err) return console.log(err);
      res.json(thing)
    })
  });
});

module.exports = {
  router,
  passport
};
