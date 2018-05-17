const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema({
  title: String,
  price: Number,
  image: {
    type:String,
    default:'https://d26hhearhq0yio.cloudfront.net/content/misterspex/produkte/grafiken/6685969_a2.jpg'
  },
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