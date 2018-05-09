const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  applicants: [{
    type: ObjectId,
    ref: 'User'
  }],

  sold:boolean
});

const Item = mongoose.model("Movie", movieSchema);

module.exports = Movie;