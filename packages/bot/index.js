const sleep = require('sleep-promise')
const {db} = require('../firestore')
const reddit = require('../reddit')
const twiends = require('../twitter/twiends')
const flipboard = require('../flipboard')

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
  await twiends.start()
  await flipboard.start(person)
}

const start = async () => {
  await runCycle()
  await sleep(Math.floor(Math.random() * 600000) + 300000)
  start()
}

start()
