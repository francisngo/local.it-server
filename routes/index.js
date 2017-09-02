const db = require('../db');
const User = require('../db/models/User')

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.send('Hello, world');
  });

  // post new user to db
  app.post('/api/user', (req, res) => {
    console.log(req.body)
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

}
