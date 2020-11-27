var express = require('express');
var multer = require('multer');
var router = express.Router();
var request = require('request');
const api = require('../services/api')
const multerConfig = require('../config/multer')

const Products = require('../models/products');
const Images = require('../models/images');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    // const { permissions } = req.body
    
    // if(!permissions || permissions.indexOf('USER_ADMIN') === -1){
    //   return res.status(401).json({
    //     msg: 'User don\'t have access in this route... ',
    //   }) 
    // }
    const products = await Products.find()
    return res.status(200).json(products)

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Products cannot be listed...',
      error
    }) 
  }
});

/* POST users listing. */
router.post('/', async function(req, res, next) {
  try {

    // const options = {
    //   url: 'http://localhost:3000/users',
    //   headers: {
    //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcmlhIiwicGVybWlzc2lvbnMiOlsiVVNFUl9BRE1JTiIsIlBST0RVQ1RfQURNSU4iLCJDQVRFR09SWV9BRE1JTiJdLCJpYXQiOjE2MDYxNzEzODksImV4cCI6MTYwNjI1Nzc4OX0.3Uf6AQcZC9jCoTYCOAAlPObArdwwIH2R6mqBc22s6bw'
    //   }
    // };
    // try {
    //   request(options, (error, resp, body) => {
    //     if(resp){
    //       console.log(resp.data, body);
    //     } else {
    //       return res.status(500).json({
    //         msg: 'User service is down...',
    //         error
    //       })
    //     }
    //   })  
    // } catch (error) {
    //   return res.status(500).json({
    //     msg: 'New product cannot be created...',
    //     error
    //   }) 
    // }
      const code = req.body.categoryCode
      var category = null;
      var categories = [];

     try {
      await api.get('http://localhost:3002/category')
        .then(function(response){
          
          categories = response.data;

        });
      
     } catch (error) {
       console.log(error)
       return res.status(500).json({
         msg: 'Category Error...',
         error
       }) 
     }

     category = categories.find(item => item.code === code)
     

    const newProduct = new Products({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      categoryId: category._id
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

router.post('/image', multer(multerConfig).single('file'), async (req, res, next) => {
  console.log('teste')
  const { originalName: name, size, key, location: url = '' } = req.file;
  
  const post = new Images({
    name,
    size,
    key,
    url
  })
  await post.save()

  console.log(post);
  return res.json(post)

});


/* PUT users listing. */
router.put('/:id', async function(req, res, next) {
  try {

    const { id } = req.params
    const { description, price } = req.body

    const product = await Products.findById({_id: id})
    if(!product){
      return res.status(400).json({
        msg: 'Unable find product...'
      })
    }

    product.description = description
    product.price = price

    await product.save()
    return res.status(200).json('Product successfully updated!')
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Product cannot be updated...',
      error
    }) 
  }
});


/* DELETE users listing. */
router.delete('/:id', async function(req, res, next) {
  try {
    const { id } = req.params

    const product = await Products.deleteOne({_id: id})
    if(product.deletedCount === 0){
      return res.status(400).json({
        msg: 'Unable find product...'
      })
    }
    
    return res.status(200).json('Product successfully deleted!')
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Product cannot be deleteded...',
      error
    }) 
  }
});


module.exports = router;
