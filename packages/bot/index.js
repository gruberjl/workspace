const sleep = require('sleep-promise')
const {db} = require('../firestore')
const reddit = require('../reddit')
// const flipboard = require('../flipboard')
const twitter = require('../twitter')
const facebook = require('../facebook')
const linkedin = require('../linkedin')
const medium = require('../medium')

const getRandomPerson = async () => {
  const snapshot = await db.collection('people').get()
  const id = Math.floor(Math.random()*snapshot.size)
  let idx = 0
  let person
  snapshot.forEach(doc => {
    if (idx == id)
      person = doc
    idx++
  })
  return person
}

const runCycle = async () => {
  const person = await getRandomPerson()
  console.log('')
  console.log(`Running cycle for ${person.id}`)
  await reddit.start(person)
  // await flipboard.start(person)
  await twitter.start(person)
  await facebook.start()
  await linkedin.start()
  await medium.start()
  console.log(`Cycle complete for ${person.id}`)
}

const start = async () => {
  await runCycle()
  await sleep(Math.floor(Math.random() * 600000) + 300000)
  start()
}

start()
