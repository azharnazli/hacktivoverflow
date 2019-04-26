const { Question } = require('../models')

class QuestionController{

  static createQuestion(req, res) {
    Question.create({...req.body, owner : req.authenticated._id})
      .then(question => {
        res.status(201).json(question)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static allQuestion(req, res) {
    Question.find()
      .populate('owner',['email', 'username'])
      .then((questions)=> {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static myQuestion(req, res) {
    Question.findById(req.params.id)
      .populate('owner',['username','email'])
      .populate({
        path: 'answer',
        populate: {
          path: 'owner'
        }
      })
      .then((questions)=> {
        res.status(200).json(questions)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static async votingUp(req, res) {
    try {
      let que = await Question
      .findById(req.params.id)
      .populate('owner')
      .populate({
        path: 'answer',
        populate: {
          path: 'owner'
        }
      })
      let idxUp = que.voteUp.indexOf(req.authenticated._id) <  0
      let idxDown = que.voteDown.indexOf(req.authenticated._id) <  0
      let samePerson =  que.owner._id == req.authenticated._id
      if(samePerson)  {
        res.status(400).json({message: 'you cannot vote your question'})
      } else if(idxUp && idxDown) {
        que.voteUp.push(req.authenticated._id)
        await que.save()
      }  else if(!idxDown) {
        que.voteDown = que.voteDown.filter(el => el != req.authenticated._id )
        que.voteUp.push(req.authenticated._id)
        await que.save()
      } else {
        que.voteUp = que.voteUp.filter( el => el != req.authenticated._id)
        await que.save()
      }

      res.status(200).json(que)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async votingDown(req, res) {
    try {
      let que = await Question
      .findById(req.params.id)
      .populate('owner')
      .populate({
        path: 'answer',
        populate: {
          path: 'owner'
        }
      })
      let idxUp = que.voteUp.indexOf(req.authenticated._id) <  0
      let idxDown = que.voteDown.indexOf(req.authenticated._id) <  0
      let samePerson =  que.owner._id == req.authenticated._id
      if(samePerson)  {
        res.status(400).json({message: 'you cannot vote your question'})
      } else if(idxUp && idxDown) {
        que.voteDown.push(req.authenticated._id)
        await que.save()
      }  else if(!idxUp) {
        que.voteUp = que.voteUp.filter(el => el != req.authenticated._id )
        que.voteDown.push(req.authenticated._id)
        await que.save()
      } else {
        que.voteDown = que.voteDown.filter( el => el != req.authenticated._id)
        await que.save()
      }
      res.status(200).json(que)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async updateQuestion(req, res) {
    try {
     let que  = await Question.findByIdAndUpdate(req.params.id,
      {
        title: req.body.title,
        question: req.body.question
      },{
        new : true
      })
     res.status(200).json(que)
    } catch (error) {
      res.status(500).json(err)
    }
  }

  static async deleteQuestion(req, res) {
    try {
      let que = await Question.findByIdAndDelete(req.params.id)
      res.status(200).json(que)
    } catch (error) {
      res.status(500).json(error)
    }
  }

}

module.exports = QuestionController