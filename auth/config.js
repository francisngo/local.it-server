const facebook = {
  clientID: '872764509546891',
  clientSecret: '5fd41557cdbf4dfb80abf668f0b815c1',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture', 'email']
};

module.exports = facebook;
