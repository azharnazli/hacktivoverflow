const { User } = require('../models/')
const { sign, verify } = require('../helpers/jwt')


class UserController {

  static createUser(req, res) {
    User.create(req.body)
    .then((user)=> {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
  
  static loginUser(req, res) {
    User.findOne({
      email : req.body.email
    })
    .then((found) => {
      if(!found) {
        res.status(401).json({message : 'email/password not found'})
      } else {
        let token = sign({
          _id : found._id,
          email: found.email,
          username: found.username
        })
        res.status(200).json({ 
          token : token,
          email : found.email, 
          username : found.username 
        })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static verifyToken(req, res) {
    let verified = verify(req.body.token)
    res.status(200).json(verified)
  }

}

module.exports = UserController