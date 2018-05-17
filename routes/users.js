var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user')
const Item = require('../models/item')

/* GET users listing. */

router.get('/:id', (req, res, next) => {
  const userPromise=User.findById(req.params.id)
  const itemsPromise=Item.find({ owner: req.params.id ,sold:false})
  const itemsApplied=Item.find({applicants:req.params.id, sold: true})
  const itemsBooked=Item.find({applicants:req.params.id, sold: false})
  Promise.all([userPromise,itemsPromise,itemsApplied,itemsBooked])
  .then((result) => {
    if (!result) {
      return res.status(404).json({code: 'not-found'});
    }
    res.json(result)
  })
  .catch(next)
});

router.post('/:id/reviews', (req, res, next) => {
  const rating = req.body.rating;
  const description = req.body.description;
  const userId = req.params.id;
  
  if (!rating || !description){
    return res.status(422).json({code: 'unprocessable-entity'});
  }

  const newData = {
    rating,
    description
  };

  User.findById(userId)
  .then((result) => {
    // check if there is a user with this id

    result.reviews.push(newData)

    return result.save()
  })
  .then(() => {
    res.status(201).json({_id: userId});
  })
  .catch(next);
});

router.get('/:id/requests', (req, res, next) => {
  Item.find({owner:req.params.id, sold: false})
  .populate('applicants')
   .then((result) => {
     if (!result) {
       return res.status(404).json({code: 'not-found'});
     }
     res.json(result)
   })
   .catch(next)
 });


 router.get('/:id/itemsReceived', (req, res, next) => {
   console.log(req.params.id);
  Item.find({applicants:req.params.id, sold: false})
   .then((result) => {
     if (!result) {
       return res.status(404).json({code: 'not-found'});
     }
     res.json(result)
   })
   .catch(next)
 });

module.exports = router;
