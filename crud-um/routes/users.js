var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users')
const Roles = require('../models/roles')
const Permisssions = require('../models/permissions')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const { permissions } = req.body
    
    if(!permissions || permissions.indexOf('USER_ADMIN') === -1){
      return res.status(401).json({
        msg: 'User don\'t have access in this route... ',
      }) 
    }

    const users = await Users.find()
    
    return res.status(200).json(users)
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
    const { permissions } = req.body
    
    if(!permissions || permissions.indexOf('USER_ADMIN') === -1){
      return res.status(401).json({
        msg: 'User don\'t have access in this route... ',
      }) 
    }
    
    const role = await Roles.findOne({
      name: req.body.role
    })

    if(!role){
      return res.status(400).json({
        msg: 'Unable find role...'
      })
    }

    const newUser = new Users({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      emoji: req.body.emoji,
      role: role._id
    })

    await newUser.save()
    return res.status(201).json('New user successfully created!')
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'New user cannot be created...',
      error
    }) 
  }
});

/* POST users listing. */
router.post('/authenticate', async function(req, res, next) {
  try {
    const user = await Users.findOne({
      username: req.body.username
    })

    if(!user || !bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({
        msg: 'Unable to authenticate the user with the entered data...'
      })
    }

    const userRole = await Roles.findById(user.role)
    const userPermissions = await Permisssions.find({roleId: userRole._id})
    const permissions = userPermissions.map(item => item.name)
    
    const token = jwt.sign({
      username: user.username, permissions: permissions
    }, 'TOP_SECRET', {
      expiresIn: 86400
    })

    return res.status(200).json({
      msg: 'User successfully authenticated.',
      token,
      username: user.username,
      emoji: user.emoji,
      permissions: permissions
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Error trying to authenticate...',
      error
    }) 
  }
});


module.exports = router;
