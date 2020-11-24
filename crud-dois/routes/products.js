var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Products = require('../models/products');
var request = require('request');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    // const { permissions } = req.body
    
    // if(!permissions || permissions.indexOf('USER_ADMIN') === -1){
    //   return res.status(401).json({
    //     msg: 'User don\'t have access in this route... ',
    //   }) 
    // }
    // const users = await Users.find()
    return res.status(200).json('oi')

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Users cannot be listed...',
      error
    }) 
  }
});

/* POST users listing. */
router.post('/', async function(req, res, next) {
  try {

    const options = {
      url: 'http://localhost:3000/users',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmlhIiwicGVybWlzc2lvbnMiOlsiVVNFUl9BRE1JTiIsIlBST0RVQ1RfQURNSU4iLCJDQVRFR09SWV9BRE1JTiJdLCJpYXQiOjE2MDYxNzEzODksImV4cCI6MTYwNjI1Nzc4OX0.3Uf6AQcZC9jCoTYCOAAlPObArdwwIH2R6mqBc22s6bw'
      }
    };

    request(options, (error, resp, body) => {
      console.log(resp.data, body);
    })

    const newProduct = new Products({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    })

    await newProduct.save()
    return res.status(201).json('New product successfully created!')
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'New product cannot be created...',
      error
    }) 
  }
});


module.exports = router;