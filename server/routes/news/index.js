const routes = require('express').Router()
const {NewsController} = require('../../controllers/')

routes.get('/',  NewsController.getNews)

module.exports =  routes