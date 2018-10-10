const {db} = require('../../firestore')

const getPeople = async () => {
  const snapshot = await db.collection('people').get()
  const people = []

  snapshot.forEach(doc => {
    if (doc.data().medium.isLoggedIn) people.push(doc)
  })

  return people
}

module.exports = {getPeople}
