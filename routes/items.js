'use strict'
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Item = require('../models/item')

/* GET home page. */
router.get('/', (req, res, next) => {
  Item.find ({})
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

  if (!title || !price || !description){
    return res.status(422).json({code: 'unprocessable-entity'});
  }

  const newItem = new Item({title, price, description, owner});

  newItem.save()
  .then((result) => {
    res.status(201).json({code: 'okey'})
  })
  .catch(next);
});

router.get('/:id', (req, res, next) => {
  Item.findById (req.params.id)
  .then((result) => {
    res.json(result)
  })
  .catch(next)
});

// router.put('/:id', (req, res, next) => {

// // if not mongoose type
// if (!mongoose.Types.ObjectId.isValid(req.params.id))  {
//   return res.status(422).json({code : 'unprocessable-entity'})
// }

//   const newData = {
//     title: req.body.title,
//     posterUrl: req.body.posterUrl,
//     price: req.body.price
//   }

//   //update the new one from mogoose --without user experience
//   const options ={
//     new: true
//   }
//   //if there is no movie with this id
//   Movie.findById(req.params.id)
//   .then((result) => {
//     if(!result) {
//       return res.status(404).json({code: 'not-found'});
//     }
    
//     result.title=newData.title;
//     result.year=newData.year;
//     result.posterUrl=newData.posterUrl;

//     result.save()
//     .then(()=> {
//       res.json(result);
//     })
//     .catch(next);
//   })
//   .catch(next)
// });


// router.delete('/:id', (req, res, next) =>{

// // if not mongoose type
// if (!mongoose.Types.ObjectId.isValid(req.params.id))  {
//   return res.status(422).json({code : 'unprocessable-entity'})
// }

//   //if there is no movie with this id
//   Movie.findById(req.params.id)
//   .then((result) => {
//     if(!result) {
//       return res.status(404).json({code: 'not-found'});
//     }
    
//     result.remove()
//     .then(()=> {
//       res.json(result);
//     })
//     .catch(next);
//   })
//   .catch(next)
// });



module.exports = router;
