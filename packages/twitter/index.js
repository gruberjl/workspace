const Twitter = require('twitter')
const {db} = require('../firestore')
const {browse} = require('./lib/browse')

const start = async (personDoc) => {
  const person = personDoc.data()

  if (person.twitter.isDisabled) return
  if (!person.twitter.accessToken) return

  const app = await db.collection('apps').doc('twitter').get()

  const client = new Twitter({
    consumer_key: app.data().key,
    consumer_secret: app.data().secret,
    access_token_key: person.twitter.accessToken,
    access_token_secret: person.twitter.refreshToken
  })

  await browse(personDoc, client)
}

module.exports = {start}
