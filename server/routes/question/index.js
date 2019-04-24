const route = require('express').Router()
const { QuestionController } = require('../../controllers')
const authenticated = require('../../middlewares/authenticated')

route.use(authenticated)

route.get('/', QuestionController.allQuestion)
route.get('/:id', QuestionController.myQuestion)
route.post('/', authenticated, QuestionController.createQuestion)
route.patch('/up/:id', authenticated, QuestionController.votingUp)
route.patch('/down/:id', authenticated, QuestionController.votingDown)
route.put('/:id', QuestionController.updateQuestion)
module.exports = route