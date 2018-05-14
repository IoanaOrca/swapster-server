'use strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../models/item')

router.get('/', (req, res, next) => {
  Item.find({title:new RegExp(req.query.terms, 'i')})
  .then((result) => {
    res.json(result)
  })
  .catch(next)
});

router.post('/', (req, res, next) => {
  const title = req.body.title;
  const price = Number(req.body.price);
  const description = req.body.description;
  const owner = req.session.currentUser._id;
  const sold = false;

  if (!title || !price || !description){
    return res.status(422).json({code: 'unprocessable-entity'});
  }

  const newItem = new Item({title, price, description, owner,sold});

  newItem.save()
  .then((result) => {
    res.status(201).json(result)
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Item.findById (req.params.id)
  .then((result) => {
    if (!result) {
      return res.status(404).json({code: 'not-found'});
    }
    res.json(result)
  })
  .catch(next)
});

router.put('/:id', (req, res, next) => {

// if not mongoose type
if (!mongoose.Types.ObjectId.isValid(req.params.id))  {
  return res.status(422).json({code : 'unprocessable-entity'})
}

  const newData = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description
  }

  //update the new one from mogoose --without user experience
  const options ={
    new: true
  }
  //if there is no item with this id
  Item.findById(req.params.id)
  .then((result) => {
    if(!result) {
      return res.status(404).json({code: 'not-found'});
    }
    
    result.title=newData.title;
    result.price=newData.price;
    result.description=newData.description;

    result.save()
    .then(()=> {
      res.json(result);
    })
    .catch(next);
  })
  .catch(next)
});


router.delete('/:id', (req, res, next) =>{

// if not mongoose type
if (!mongoose.Types.ObjectId.isValid(req.params.id))  {
  return res.status(422).json({code : 'unprocessable-entity'})
}

  //if there is no movie with this id
  Item.findById(req.params.id)
    .then((result) => {
      if(!result) {
        return res.status(404).json({code: 'not-found'});
      }
      
      return result.remove()
        .then(()=> {
          res.json(result);
        })
  })
  .catch(next)
});

router.put('/:id/apply', (req, res, next) => {

  // if not mongoose type
  if (!mongoose.Types.ObjectId.isValid(req.params.id))  {
    return res.status(422).json({code : 'unprocessable-entity'})
  }

  //update the new one from mogoose --without user experience
  Item.updateOne({_id: req.params.id}, { $push: { applicants: req.session.currentUser } })
    .then((result) => {
      if (!result.nModified) {
        return res.status(404).json({code: 'not-found'});
      }
      res.status(204).send();
    })
    .catch(next);
});

router.put('/:id/sell', (req, res, next) => {

  // if not mongoose type
  if (!mongoose.Types.ObjectId.isValid(req.params.id))  {
    return res.status(422).json({code : 'unprocessable-entity'})
  }

  //update the new one from mogoose --without user experience
  Item.updateOne({_id: req.params.id}, { sold: true })
    .then((result) => {
      if (!result.nModified) {
        return res.status(404).json({code: 'not-found'});
      }
      res.status(204).send();
    })
    .catch(next);
});
module.exports = router;
