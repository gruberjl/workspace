const {join} = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const {postCompose} = require('./post-compose')

const createServer = async () => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.set('view engine', 'pug')
  app.set('views', join(__dirname, '..', 'views'))
  app.use('/assets', express.static(join(__dirname, '..', 'assets')))
  app.get('/', (req, res) => {res.render('index')})
  app.get('/compose', (req, res) => {res.render('compose')})
  app.post('/compose', postCompose, (req, res) => {res.render('index', {flash: res.flash})})

  return app
}

module.exports = {createServer}
