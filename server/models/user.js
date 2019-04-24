const { hash } = require('../helpers/bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email : {
    type : String,
    required: [true, 'please input your email']
  },
  password : {
    type : String,
    required: [true, 'please insert your password'],
  },
  username : {
    type : String,
    required: [true, 'please insert your username']
  }
})

UserSchema.pre('save', function(next) {
  this.password = hash(this.password)
  next()
})


const User = mongoose.model('User', UserSchema)

module.exports = User