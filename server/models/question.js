const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  owner: {
    type : Schema.Types.ObjectId,
    ref : 'User'
  },
  title : {
    type : String,
    required : true
  },
  question : {
    type : String,
    required: true
  },
  voteUp : [{
    type : Schema.Types.ObjectId,
    ref : 'User'
  }],
  voteDown: [{
    type : Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt : {
    type : Date,
    default : new Date()
  },
  answer: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }]

})

const Question = mongoose.model('Question', QuestionSchema)

module.exports = Question