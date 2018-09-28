const {db} = require('../../firestore')

const signin = async (driver) => {
  await driver.get('https://mix.com/')
  await driver.sleep(120000)
}

const isMatch = (data) => (data.medium.username && !data.medium.isDisabled && !data.medium.isLoggedIn)

const save = async (personDoc) => {
  const p = await db.collection('people').doc(personDoc.id).get()
  const data = p.data()
  data.medium.isLoggedIn = true
  await db.collection('people').doc(p.id).set(data)
}

module.exports = {signin, isMatch, save}
