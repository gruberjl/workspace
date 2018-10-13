const {start} = require('./index')
const {db} = require('../firestore')

const run = async () => {
  const personDoc = await db.collection('people').doc('Adam.Tucker').get()
  await start(personDoc)
}

run()
