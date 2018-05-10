const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema({
  title: String,
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

  sold:Boolean
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;