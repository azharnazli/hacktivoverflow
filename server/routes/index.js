const routes = require('express').Router()
const userRoutes = require('./Users')
const questionRoutes = require('./question')
const answersRoutes = require('./answer')
const newsRoutes = require('./news')

routes.use('/users', userRoutes)
routes.use('/answers', answersRoutes)
routes.use('/questions', questionRoutes)
routes.use('/news', newsRoutes)

module.exports = routes