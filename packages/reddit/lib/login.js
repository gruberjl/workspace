const snoowrap = require('snoowrap')
const {db} = require('../../firestore')

const login = async (peopleDoc) => {
  const app = (await db.collection('apps').doc('reddit').get()).data()
  const auth = {
    userAgent: 'GitBit',
    clientId: app.key,
    clientSecret: app.secret,
    refreshToken: peopleDoc.data().reddit.refreshToken
  }

  const r = new snoowrap(auth)

  return r
}

module.exports = {login}
