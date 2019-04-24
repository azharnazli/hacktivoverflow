require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const axios = require('axios')
const cron = require('node-cron')
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connectiom', (socket)=> {
  console.log('new connection')
})

let schedule = cron.schedule('* * * * *',async function() {
  try{
    let {data} = await axios({
      method: 'get',
      url: 'https://newsapi.org/v2/top-headlines?country=id&category=technology&apiKey='  + process.env.APIKEY
    })
    io.emit('news', data.articles[Math.floor(Math.random()*data.articles.length)])
  } catch (error) {
    console.log(error)
  }


})
schedule.start()

const port = 3000

const mongodb = process.env.NODE_ENV || 'dev'
const url  = 'mongodb://localhost/hacktivOverflow_' + mongodb

const indexRoutes = require('./routes/');

mongoose.connect(url, {useNewUrlParser: true});

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', indexRoutes);


http.listen(port, ()=> {
  console.log(`listening on port : ${port}`)
})

