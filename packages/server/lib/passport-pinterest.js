const PinterestStrategy = require('passport-pinterest').Strategy
const {db} = require('../../firestore')

const createPassportPinterest = async (app, passport) => {
  const doc = (await db.collection('apps').doc('pinterest').get()).data()

  passport.use(new PinterestStrategy({
    clientID: doc.key,
    clientSecret: doc.secret,
    scope: ['read_public', 'write_public', 'read_relationships', 'write_relationships'],
    callbackURL: doc.redirect_uri,
    state: true,
    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    const snapshot = await db.collection('people')
      .where('pinterest.username', '==', profile.username)
      .limit(1)
      .get()

    snapshot.forEach(doc => {
      const data = doc.data()
      data.pinterest.accessToken = accessToken
      db.collection('people').doc(doc.id).set(data).then(() => {
        done(null, {flash:{text:'success!'}})
      })
    })
  }))

  app.get('/auth/pinterest', function(req, res, next){
    passport.authenticate('pinterest', {
      duration: 'permanent',
      scope: ['read_public', 'write_public', 'read_relationships', 'write_relationships']
    })(req, res, next)
  })

  app.get('/auth/pinterest/callback', function(req, res, next){
    passport.authenticate('pinterest', {
      successRedirect: '/',
      failureRedirect: '/'
    })(req, res, next)
  })

  return passport
}

module.exports = {createPassportPinterest}
