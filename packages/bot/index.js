const {db} = require('../firestore')

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
  console.log(person.data())
}

const start = async () => {
  runCycle()
}

start()
