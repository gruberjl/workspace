const {db} = require('../firestore')

const saveCookies = async (driver, personDoc, data={}) => {
  const cookies = await driver.manage().getCookies()

  const person = Object.assign({}, personDoc.data(), data)
  person.cookies = cookies
  await db.collection('people').doc(personDoc.id).set(person)
}

module.exports = {saveCookies}
