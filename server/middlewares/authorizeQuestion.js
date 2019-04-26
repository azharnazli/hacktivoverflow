const { Question } = require('../models')

module.exports = async (req, res, next) => {
    try {
      let data = await Question.findById(req.params.id)
      if(data.owner.toString() == req.authenticated._id) {
        next()
      } else{
        res.status(401).json({message: 'Unauthorization User'})
      }
    } catch (error) {
      res.status(500).json(error)
    }

}