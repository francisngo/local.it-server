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
// const YelpApi = require('yelp-api-v3');
// const yelp = require('yelp-fusion');
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
  // console.log(user);
  User.findOne({ fbID: user }, (err, user) => {
    if (err) { return console.error(err) }
    res.json(user);
  });
});

router.put('/api/:user', (req, res) => {
  let city = req.body.city;
  let user = req.params.user;
  let business = req.body.business;
  // console.log('user', user);
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
        // console.log('this should be true, ', cityExists);
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

//save itinerary list
router.put('/api/interests/:user', (req, res) => {
  // console.log('this is the body', req.body);
  let user = req.params.user;
  let { name, location, latitude, longitude, itineraryList } = req.body;
  let saveItinerary = {
      name: name,
      location: location,
      latitude: latitude,
      longitude: longitude,
      itineraryList: itineraryList
  };
  User.findOne({ fbID: user }, (err, user) => {
    if (err) { return console.error(err) }
    user.itineraryByCity.push(saveItinerary);
    user.save((err, thing) => {
      if (err) return console.log(err);
      res.json(thing);
    });
  });
});

// //Handle Yelp data retreival and Python parsing
// router.post('/api/yelp', (req, res) => {
//   // console.log('props: ', req.body);
//   // var credentials = {
//   //   app_id: yelpConfig.appId,
//   //   app_secret: yelpConfig.appSecret
//   // };
//   // const yelp = new YelpApi(credentials);
//   let lat = req.body.latitude;
//   let lng = req.body.longitude;
//   let latlng = String(lat) + ',' + String(lng);
//   let title = req.body.title;
//   let userdata = null;
//   let userid = req.body.fbID;
//   let params = {
//     term: title,
//     location: latlng,
//     limit: '15',
//   };
//
//   // console.log('params: ', params);
//   yelp.accessToken(yelpConfig.appId, yelpConfig.appSecret).then(response => {
//     const client = yelp.client(response.jsonBody.access_token);
//
//     client.search({
//       term: title,
//       location: latlng,
//       limit: '15'
//     }).then(response => {
//       console.log(response);
//     });
//   })
//   .catch(e => {
//   console.log(e);
//
//   });
//
//   let asyncUser = function(id) {
//     // console.log('in yelp');
//     return new Promise(function(resolve, reject) {
//       User.findOne({ fbID: id }, (err, usercheck) => {
//         if (err) { return reject(err); }
//         if (usercheck.interestsByCity.length > 0) {
//           if (usercheck.interestsByCity[0].interests.length > 3 && usercheck.interestsByCity[0].dislikedInterests.length > 3) {
//             fs.writeFile('User.json', JSON.stringify(usercheck), 'utf8', function() {
//               return resolve(true);
//             });
//           } else {
//             return resolve(false);
//           }
//         } else {
//           return resolve(false);
//         }
//       });
//     })
//     .catch((err) => console.log(err));
//   }
//
//   let asyncYelp = function(params) {
//     // console.log('in user');
//     return new Promise(function(resolve, reject) {
//       yelp.search(params).then((data) => {
//         fs.writeFile('Yelp.json', data, 'utf8', function() {
//           return resolve(data);
//         });
//       });
//     })
//     .catch((err) => console.log(err));
//   }
//
//   let pythonParse = function() {
//     PythonShell.run('knnfilter.py', function (err, results) {
//       if (err) throw err;
//       res.json(results);
//     });
//   }
//
//   Promise.all([asyncYelp(params), asyncUser(userid)])
//   .then(values => {
//     // console.log('promises taken care of');
//     // console.log('values: ', values[1]);
//     if (values[1] === true) {
//       pythonParse();
//     } else {
//       data = JSON.parse(values[0])
//       data = JSON.stringify(data.businesses);
//       res.json([data]);
//     }
//   })
//   .catch((err) => console.log(err));
//
// });


module.exports = {
  router,
  passport
};
