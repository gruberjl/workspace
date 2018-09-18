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
    db.collection('people').doc(req.query.state).get().then(doc => {
      const data = doc.data()
      data.reddit.refreshToken = refreshToken
      db.collection('people').doc(req.query.state).set(data).then(() => {
        done(null, {flash:{text:'success!'}})
      })
    })
  }))

  app.get('/auth/reddit', function(req, res, next){
    passport.authenticate('reddit', {
      state: req.query.username,
      duration: 'permanent',
      scope: 'account,creddits,edit,flair,history,identity,livemanage,modconfig,modcontributors,modflair,modlog,modmail,modothers,modposts,modself,modwiki,mysubreddits,privatemessages,read,report,save,structuredstyles,submit,subscribe,vote,wikiedit,wikiread'
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
