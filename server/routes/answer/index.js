const routes = require('express').Router()
const { AnswerController } = require('../../controllers/')
const authenticated =require('../../middlewares/authenticated')
const authorizeAnswer = require('../../middlewares/authorizeAnswer')


routes.get('/:answerId',authenticated, AnswerController.getMyAnswer)
routes.post('/:id',authenticated, AnswerController.createAnswer)
routes.patch('/up/:answerId',authenticated, AnswerController.voteUp)
routes.patch('/down/:answerId',authenticated, AnswerController.voteDown)
routes.put('/:answerId',authenticated,authorizeAnswer, AnswerController.editAnswer)
routes.delete('/:answerId', authenticated, authorizeAnswer, AnswerController.deleteAnswer)


module.exports = routes