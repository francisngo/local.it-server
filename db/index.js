const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// dev db server
// const url = 'mongodb://localhost:27017/local-it';
// production db server
const url = 'mongodb://54.67.111.142/local-it';

mongoose.connect(url, {
  useMongoClient: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected successfully.');
});

module.exports = db;
