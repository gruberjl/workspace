const {db} = require('../firestore')

const saveCookies = async (driver, personDoc, data={}) => {
  const cookies = await driver.manage().getCookies()

  const person = Object.assign({}, personDoc.data(), data)
  if (!person.cookies) person.cookies = []

  cookies.forEach(cookie => {
    person.cookies.push(cookie)
  })

  await db.collection('people').doc(personDoc.id).set(person)
}

module.exports = {saveCookies}
