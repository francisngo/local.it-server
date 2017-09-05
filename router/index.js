const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const facebook = require('../auth/config');

// transform Facebook profile
const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

// register Facebook Passport strategy
passport.use(new Strategy(facebook,
  function(accessToken, refreshToken, profile, cb) {
    // TODO: save profile to db
    // User.findOrCreate({ facebookId: profile.id }, function(err, user) {
    //   return cb(err, user);
    // });
    // console.log(profile);
    cb(null, profile);
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello, world');
});

//TODO: Set up authentication, Set up protecting routes, Set up signing in.

// route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook'));

// handle callback after facebook has authenticated the user
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  // successful authentication, redirect home.
  function(req, res) {
    console.log('...redirecting...');
    res.redirect('/');
  }
);

module.exports = {
  router,
  passport
};
