const Twitter = require('twitter')
const sleep = require('sleep-promise')
const {db} = require('../../firestore')
const {follow} = require('./follow')
const {search} = require('./search')
const {interact} = require('./interact')

let nextRun

const shouldRun = (commonDoc) => {
  if (!nextRun) nextRun = (commonDoc.data().lastRun) + 60 * 60 * 24 * 1000

  const time = new Date().getTime()
  if (nextRun > time) return false

  nextRun = time + 60 * 60 * 24 * 1000

  return true
}

const start = async () => {
  const commonDoc = await db.collection('common').doc('twitter').get()
  if (!shouldRun(commonDoc)) return

  await db.collection('common').doc('twitter').set(
    Object.assign({}, commonDoc.data(), {lastRun:(new Date().getTime())})
  )

  const appDoc = await db.collection('apps').doc('twitter').get()

  const {key, secret} = commonDoc.data()
  const client = new Twitter({
    consumer_key: appDoc.data().key,
    consumer_secret: appDoc.data().secret,
    access_token_key: key,
    access_token_secret: secret
  })

  const tweets = await search(client)
  await sleep(30000)
  await follow(client, tweets)

  await interact(client)
}

module.exports = {start}
