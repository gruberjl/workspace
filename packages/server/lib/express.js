const {join} = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const {createPassport} = require('./passport')
const {postCompose} = require('./post-compose')
const {renderIndex} = require('./render-index')

const createServer = async () => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(session({ secret: 'cats', resave:false, saveUninitialized: false }))
  await createPassport(app)
  app.set('view engine', 'pug')
  app.set('views', join(__dirname, '..', 'views'))
  app.use('/assets', express.static(join(__dirname, '..', 'assets')))
  app.get('/', renderIndex)
  app.get('/compose', (req, res) => {res.render('compose')})
  app.post('/compose', postCompose, renderIndex)
  app.get('/auth', (req, res) => {res.render('auth')})

  return app
}

module.exports = {createServer}
