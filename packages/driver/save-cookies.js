const {db} = require('../firestore')

const saveCookies = async (driver, personDoc, key) => {
  if (!key || typeof key != 'string') throw 'driver/saveCookies requires key'
  const cookies = await driver.manage().getCookies()

  const person = personDoc.data()

  if (!person[key].cookies) person[key].cookies = []

  cookies.forEach(cookie => {
    person[key].cookies.push(cookie)
  })

  await db.collection('people').doc(personDoc.id).set(person)
}

module.exports = {saveCookies}
