const passport = require('passport')
const {createPassportReddit} = require('./passport-reddit')
const {createPassportPinterest} = require('./passport-pinterest')
const {createPassportTwitter} = require('./passport-twitter')

const createPassport = async (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function(user, done) {
    done(null, '1')
  })

  passport.deserializeUser(function(id, done) {
    done(null, {id:1})
  })

  await createPassportReddit(app, passport)
  await createPassportPinterest(app, passport)
  await createPassportTwitter(app, passport)
}

module.exports = {createPassport}
