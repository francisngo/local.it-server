const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: String,
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
