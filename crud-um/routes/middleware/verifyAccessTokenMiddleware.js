const Users = require('../../models/users');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    if(!req.headers['authorization']) {
      return res.status(400).json({msg: 'Access token not informed...'})
    }

    const token = req.headers['authorization'].split(' ')
    if(token[0] !== 'Bearer'){
      return res.status(400).json({msg: 'Access token not valid...'})
    }
    const user = await jwt.verify(token[1], 'TOP_SECRET')
    req.body.user = await Users.findOne({username: user.username})
    req.body.permissions = user.permissions
    next()
  } catch (error) {
    console.log(error);
    return res.status(400).json({msg: 'Error during token validation...', error: error})
  }
}