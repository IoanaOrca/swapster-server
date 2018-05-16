const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema({
  title: String,
  price: Number,
  image: {
    type:String,
    default:'https://cdn.shopify.com/s/files/1/2038/6329/products/product-image-341848880_grande.jpg?v=1501242496'
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