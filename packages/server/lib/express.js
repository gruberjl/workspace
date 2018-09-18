const {join} = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const {createPassport} = require('./passport')
const {postCompose} = require('./post-compose')

const createServer = async () => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(session({ secret: 'cats', resave:false, saveUninitialized: false }))
  await createPassport(app)
  app.set('view engine', 'pug')
  app.set('views', join(__dirname, '..', 'views'))
  app.use('/assets', express.static(join(__dirname, '..', 'assets')))
  app.get('/', (req, res) => {res.render('index', {flash: res.flash})})
  app.get('/compose', (req, res) => {res.render('compose')})
  app.post('/compose', postCompose, (req, res) => {res.render('index', {flash: res.flash})})
  app.get('/auth', (req, res) => {res.render('auth')})

  return app
}

module.exports = {createServer}
