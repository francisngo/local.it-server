const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user: String,
  interestsByCity: [
    {
      city: String,
      interests: Object,
      dislikedInterests: Object
    }
  ],
  itineraryByCity: [
    {
      name: String,
      itineraryList: Object
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
