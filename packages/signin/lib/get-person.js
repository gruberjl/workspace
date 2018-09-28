const {db} = require('../../firestore')

const getPerson = async (isMatch) => {
  const snapshot = await db.collection('people').get()
  let personDoc

  snapshot.forEach(person => {
    const data = person.data()
    if (personDoc) return

    if (isMatch(data)) {
      personDoc = person
    }
  })

  return personDoc
}

module.exports = {getPerson}
