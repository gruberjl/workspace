const {db} = require('../../firestore')
const {browse} = require('./browse')

const start = async () => {
  const p = await db.collection('people').doc('Adam.Tucker').get()
  await browse(p)
}
start()
