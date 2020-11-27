var express = require('express');
var router = express.Router();

const Categories = require('../models/categories')


/* GET Categories listing. */
router.get('/', async function(req, res, next) {
  try {
    const categories = await Categories.find()
    return res.status(200).json(categories)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Categories cannot be listed...',
      error
    }) 
  }
});


/* POST categories listing. */
router.post('/', async function(req, res, next) {
  try {
    const newCategory = new Categories({
      code: req.body.code,
      name: req.body.name,
    })

    await newCategory.save()
    return res.status(201).json('New category successfully created!')
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'New category cannot be created...',
      error
    }) 
  }
});

/* PUT users listing. */
router.put('/:id', async function(req, res, next) {
  try {
    const { id } = req.params
    const { name } = req.body

    const category = await Categories.findById({_id: id})
    if(!category){
      return res.status(400).json({
        msg: 'Unable find category...'
      })
    }
  
    category.name = name    

    await category.save()
    return res.status(200).json('Category successfully updated!')
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Category cannot be updated...',
      error
    }) 
  }
});

/* DELETE category listing. */
router.delete('/:id', async function(req, res, next) {
  try {
    const { id } = req.params

    const category = await Categories.deleteOne({_id: id})
    if(category.deletedCount === 0){
      return res.status(400).json({
        msg: 'Unable find category...'
      })
    }
    
    return res.status(200).json('Category successfully deleted!')
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Category cannot be deleteded...',
      error
    }) 
  }
});

module.exports = router;
