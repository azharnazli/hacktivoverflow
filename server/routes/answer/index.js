const routes = require('express').Router()
const { AnswerController } = require('../../controllers/')
const authenticated =require('../../middlewares/authenticated')

routes.use(authenticated)

routes.get('/:answerId', AnswerController.getMyAnswer)
routes.post('/:id', AnswerController.createAnswer)
routes.patch('/up/:answerId', AnswerController.voteUp)
routes.patch('/down/:answerId', AnswerController.voteDown)
routes.put('/:answerId', AnswerController.editAnswer)


module.exports = routes