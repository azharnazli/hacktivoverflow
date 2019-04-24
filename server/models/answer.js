const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  owner: {
    type : Schema.Types.ObjectId,
    ref: 'User'
  },
  voteUp: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],

  voteDown:[{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  answer: {
    type : String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const Answer = new mongoose.model('Answer', AnswerSchema)

module.exports = Answer