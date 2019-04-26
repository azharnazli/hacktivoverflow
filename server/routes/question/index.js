const route = require('express').Router()
const { QuestionController } = require('../../controllers')
const authenticated = require('../../middlewares/authenticated')
const authorizeQuestion = require('../../middlewares/authorizeQuestion')

route.get('/',authenticated, QuestionController.allQuestion)
route.get('/:id',authenticated, QuestionController.myQuestion)
route.post('/', authenticated, QuestionController.createQuestion)

route.patch('/up/:id',authenticated,  QuestionController.votingUp)
route.patch('/down/:id',authenticated, QuestionController.votingDown)
route.put('/:id',authenticated,authorizeQuestion, QuestionController.updateQuestion)
route.delete('/:id',authenticated,authorizeQuestion, QuestionController.deleteQuestion)
module.exports = route