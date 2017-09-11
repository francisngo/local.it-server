const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const facebookConfig = require('../auth/config');
const router = require('express').Router();
const User = require('../db/models/User');
const db = require('../db');
const bodyParser = require('body-parser');

// register Facebook Passport strategy
passport.use(new facebookStrategy(facebookConfig,
  (accessToken, refreshToken, profile, done) => {
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
          return done(null, user);
        }
        //otherwise, create new user
        else {
          const newUser = new User();
          newUser.fbID = profile.id;
          newUser.user = profile.displayName;
          newUser.token = accessToken;
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

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => {
  console.log('============================================');
  console.log('============================================');
  console.log('ID:', id)
  console.log('============================================');
  console.log('============================================');
  User.findById(id, (err, id) => {
    done(err, id);
  });
});

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

// handle logout
router.get('/signout', (req, res) => {
  req.logout();
  res.redirect('localit://login?user=' + JSON.stringify(req.user))
});

// apis
router.get('/api/user'), (req, res) => {
  User.find((err, user) => {
    console.log(user);
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

router.get('/api/profile', passport.authenticate('facebook'), (req, res) => {
  //db query
  console.log('============================================');
  console.log('============================================');
  console.log('req.user: ', req.user);
  console.log('============================================');
  console.log('============================================');

  User.find({}, (err, user) => {
    if (err) { throw err; }
    res.json(user);
  });
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('localit://login?user=' + JSON.stringify(req.user))
}

module.exports = {
  router,
  passport
};
