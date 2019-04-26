const {
  Answer,
  Question
} = require('../models')

class AnswerController {

  static async createAnswer(req, res) {
    try {
      let ans = await Answer.create({
        ...req.body,
        owner: req.authenticated._id
      })
      let ques = await Question.findById(req.params.id)
      await ques.answer.push(ans)
      await ques.save()
      res.status(201).json(ans)

    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async voteUp(req, res) {
    try {
      let ans = await Answer
        .findById(req.params.answerId)
        .populate('owner')

      let samePerson = (req.authenticated._id == ans.owner._id)
      let idxUp = ans.voteUp.indexOf(req.authenticated._id) < 0
      let idxDown = ans.voteDown.indexOf(req.authenticated._id) < 0

      if (samePerson) {
        res.status(400).json({
          message: 'you cannot vote your answer'
        })
      } else if (idxUp && idxDown) {
        ans.voteUp.push(req.authenticated._id)
        await ans.save()
      } else if (!idxDown) {
        ans.voteDown = ans.voteDown.filter(el => el != req.authenticated._id)
        ans.voteUp.push(req.authenticated._id)
        await ans.save()
      } else {
        ans.voteUp = ans.voteUp.filter(el => el != req.authenticated._id)
        await ans.save()
      }
      res.status(200).json(ans)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async voteDown(req, res) {
    try {
      let ans = await Answer
        .findById(req.params.answerId)
        .populate('owner')

      let samePerson = (req.authenticated._id == ans.owner._id)
      let idxUp = ans.voteUp.indexOf(req.authenticated._id) < 0
      let idxDown = ans.voteDown.indexOf(req.authenticated._id) < 0

      if (samePerson) {
        res.status(400).json({
          message: 'you cannot vote your answer'
        })
      } else if (idxUp && idxDown) {
        ans.voteDown.push(req.authenticated._id)
        await ans.save()
      } else if (!idxUp) {
        ans.voteUp = ans.voteUp.filter(el => el != req.authenticated._id)
        ans.voteDown.push(req.authenticated._id)
        await ans.save()
      } else {
        ans.voteDown = ans.voteDown.filter(el => el != req.authenticated._id)
        await ans.save()
      }
      res.status(200).json(ans)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async getMyAnswer(req, res) {
    try {
      let ans = await Answer
        .findById(req.params.answerId)
      res.status(200).json(ans)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async editAnswer(req, res) {
    try {
      let ans = await Answer
      .findByIdAndUpdate(req.params.answerId,
        {
          answer: req.body.answer
        },{
          new : true
        })
        res.status(200).json(ans)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async deleteAnswer(req, res) {
    try  {
      let data = await Answer.findByIdAndDelete(req.params.answerId)
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json(error)
    }
  }


}


module.exports = AnswerController