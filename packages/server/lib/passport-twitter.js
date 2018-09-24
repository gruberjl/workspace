const TwitterStrategy = require('passport-twitter').Strategy
const {db} = require('../../firestore')

const createPassportTwitter = async (app, passport) => {
  const doc = (await db.collection('apps').doc('twitter').get()).data()

  passport.use(new TwitterStrategy({
    consumerKey: doc.key,
    consumerSecret: doc.secret,
    callbackURL: doc.redirect_uri,
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const snapshot = await db.collection('people').where('twitter.username', '==', profile.username).limit(1).get()

    snapshot.forEach(doc => {
      const data = doc.data()
      data.twitter.accessToken = accessToken
      data.twitter.refreshToken = refreshToken
      db.collection('people').doc(doc.id).set(data).then(() => {
        done(null, {flash:{text:'success!'}})
      })
    })
  }))

  app.get('/auth/twitter', function(req, res, next){
    passport.authenticate('twitter')(req, res, next)
  })

  app.get('/auth/twitter/callback', function(req, res, next){
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/'
    })(req, res, next)
  })

  return passport
}

module.exports = {createPassportTwitter}
