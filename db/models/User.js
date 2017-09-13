const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fbID: String,
  user: String,
  photo: String,
  interestsByCity: [
    {
      city: String,
      interests: [],
      dislikedInterests: []
    }
  ],
  itineraryByCity: [
    {
      name: String,
      itineraryList: []
    }
  ]
}, { retainKeyOrder: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
