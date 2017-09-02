const db = require('../db');
const User = require('../db/models/User')

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send('Hello, world');
  });

  // post new user to db
  app.post('/api/user', (req, res) => {
    const name = req.body.user
    const newUser = new User({
      user: name
    });
    newUser.save((err, user) => {
      if (err) {
        res.json(err);
      } else {
        console.log('pass')
        res.json(user);
      }
    });
  });

  // post liked new interests
  // app.post('/api/:user/:id', (req, res) => {
    // req.body identify the user
  // })

  // post disliked new interest

  // post new itinerary

  //

}
