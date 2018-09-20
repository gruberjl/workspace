const {db} = require('../../firestore')
const {signup} = require('./signup')

const start = async () => {
  const snapshot = await db.collection('people').get()
  const people = []

  snapshot.forEach(doc => {
    if (people.length < 3 && !doc.data().pinterest.username)
      people.push(doc)
  })

  people.forEach(person => {
    signup(person)
  })
}

start()
