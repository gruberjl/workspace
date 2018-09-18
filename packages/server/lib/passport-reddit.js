const RedditStrategy = require('passport-reddit').Strategy
const {db} = require('../../firestore')

const createPassportReddit = async (app, passport) => {
  const doc = (await db.collection('apps').doc('reddit').get()).data()

  passport.use(new RedditStrategy({
    clientID: doc.key,
    clientSecret: doc.secret,
    callbackURL: doc.redirect_uri,
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    console.log(refreshToken)
    console.log(req.query.state)
    done(null, {flash:{text:'success!'}, refreshToken})
  }))

  app.get('/auth/reddit', function(req, res, next){
    passport.authenticate('reddit', {
      state: req.query.RedditEmail,
      duration: 'permanent',
    })(req, res, next)
  })

  app.get('/auth/reddit/callback', function(req, res, next){
    passport.authenticate('reddit', {
      successRedirect: '/',
      failureRedirect: '/'
    })(req, res, next)
  })

  return passport
}

module.exports = {createPassportReddit}
