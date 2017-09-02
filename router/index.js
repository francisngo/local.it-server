const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Hello, world');
});

router.get('/about', (req, res) => {
  res.send('This is the about page');
});

module.exports = router;


// const db = require('../db');
// const User = require('../db/models/User');
//
// module.exports = (app) => {
//
//   app.get('/', (req, res) => {
//     res.send('Hello, world');
//   });
//
//   app.get('/api/user', (req, res) => {
//
//   });
//
//   // post new user to db
//   app.post('/api/user', (req, res) => {
//     const name = req.body.user
//     const newUser = new User({
//       user: name
//     });
//     newUser.save((err, user) => {
//       if (err) {
//         res.json(err);
//       } else {
//         console.log('pass')
//         res.json(user);
//       }
//     });
//   });
//
//   // post liked new interests
//   // app.post('/api/:user/:id', (req, res) => {
//     // req.body identify the user
//   // })
//
//   // post disliked new interest
//
//   // post new itinerary
//
//   //
// }

/*
GET: api/user
POST: api/interests

GET: api/interests/:id
POST: api/interests/:id
PUT: api/interests/:id


Yelp:
GET: /businesses/search
*/
