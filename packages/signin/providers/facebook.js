const {db} = require('../../firestore')

const signin = async (driver) => {
  await driver.get('https://facebook.com/')
  await driver.sleep(120000)
}

const isMatch = (data) => (data.facebook.username && !data.facebook.isDisabled && !data.facebook.isLoggedIn)

const save = async (personDoc) => {
  const p = await db.collection('people').doc(personDoc.id).get()
  const data = p.data()
  data.medium.isLoggedIn = true
  await db.collection('people').doc(p.id).set(data)
}

module.exports = {signin, isMatch, save}
