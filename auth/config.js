//create .env file and enter your facebook's CLIENT_ID and CLIENT_SECRET
//create app and retrieve APP_ID and SECRET @ https://developers.facebook.com/

const facebook = {
  clientID: 'ENTER CLIENT_ID',
  clientSecret: 'ENTER CLIENT_SECRET',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'picture', 'email']
};

module.exports = facebook;
