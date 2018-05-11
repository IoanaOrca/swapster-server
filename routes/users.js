var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user')
const Item = require('../models/item')

/* GET users listing. */

router.get('/:id', (req, res, next) => {
  const userPromise=User.findById(req.params.id)
  const itemsPromise=Item.find({ owner: req.params.id })
  Promise.all([userPromise,itemsPromise])
  .then((result) => {
    if (!result) {
      return res.status(404).json({code: 'not-found'});
    }
    res.json(result)
  })
  .catch(next)
});

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
