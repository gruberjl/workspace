const Driver = require('../../driver')
const {By, Key} = Driver.webdriver
const {db} = require('../../firestore')

const signin = async (driver, personDoc, password) => {
  await driver.get('https://plus.google.com/people')

  const emailEl = await driver.findElement(By.id('identifierId'))
  const email = personDoc.data().google.gmail
  await emailEl.sendKeys(email)
  await emailEl.sendKeys(Key.ENTER)
  await driver.sleep(2000)

  const elPassword = driver.findElement(By.name('password'))
  await elPassword.sendKeys(password)
  await elPassword.sendKeys(Key.ENTER)
  await driver.sleep(2000)
}

const isMatch = (data) => (data.google.gmail && !data.google.isDisabled && !data.google.isLoggedIn)

const save = async (personDoc) => {
  const p = await db.collection('people').doc(personDoc.id).get()
  const data = p.data()
  data.google.isLoggedIn = true
  await db.collection('people').doc(p.id).set(data)
}

module.exports = {signin, isMatch, save}
