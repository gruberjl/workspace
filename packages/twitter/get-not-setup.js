const {db} = require('../firestore')

const start = async () => {
  const peopleDocs = await db.collection('people').get()
  peopleDocs.forEach(person => {
    const data = person.data().twitter

    if (!data.username && !data.isDisabled) {
      console.log(person.data().email)
    }
  })
}

start()
