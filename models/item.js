const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema({
  title: String,
  price: Number,
  image: {
    type:String,
    default:'https://media.domu.co.uk/catalog/product/cache/1/image/1000x/9df78eab33525d08d6e5fb8d27136e95/v/o/vonshef_juicer_1.jpg'
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