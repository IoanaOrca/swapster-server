const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
  reviews: {
    type: [{
      rating: Number,
      description: String,
      _id: false
    }],
    default: []
  },
  ItemsAcceptedFromOthers: [{
    type: ObjectId,
    ref: 'Item'
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;