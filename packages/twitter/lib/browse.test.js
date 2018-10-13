const Twitter = require('twitter')
const {db} = require('../../firestore')
const {browse} = require('./browse')

const start = async () => {
  const personDoc = await db.collection('people').doc('Brian.Martin').get()
  const app = await db.collection('apps').doc('twitter').get()

  const client = new Twitter({
    consumer_key: app.data().key,
    consumer_secret: app.data().secret,
    access_token_key: personDoc.data().twitter.accessToken,
    access_token_secret: personDoc.data().twitter.refreshToken
  })

  await client.get('statuses/user_timeline', {screen_name:'gruberjl', count:3})
}



start()
