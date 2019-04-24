const axios  = require('axios')
const cron = require('node-cron')

class NewsController {
  static async getNews (req, res) {
    try{
      let {data} = await axios({
        method: 'get',
        url: 'https://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey='  + process.env.APIKEY
      })
      res.status(200).json(data.articles[Math.floor(Math.random()*data.articles.length)])
    } catch (error) {
      res.status(500).json(error)
    }
  }
  
}

module.exports = NewsController