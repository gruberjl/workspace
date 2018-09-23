const {db} = require('../../firestore')
const Driver = require('../../driver')
const {By, until} = Driver.webdriver

const selectOne = async () => {
  const snapshot = await db.collection('people').get()
  let personDoc

  snapshot.forEach(doc => {
    const {flipboard} = doc.data()
    if (flipboard.username && !flipboard.isLoggedIn && !personDoc) {
      personDoc = doc
    }
  })

  return personDoc
}

const login = async (personDoc, password) => {
  const driver = await Driver.build()
  await driver.get('https://flipboard.com/signin')

  const usernameTag = await driver.findElement(By.css('input[name="username"]'))
  const passwordTag = await driver.findElement(By.css('input[name="password"]'))
  await usernameTag.sendKeys(personDoc.data().flipboard.username)
  await passwordTag.sendKeys(password)

  await driver.findElement(By.className('auth__submit-button')).click()

  await driver.wait(until.urlIs('https://flipboard.com/'))
  const cookies = await driver.manage().getCookies()

  const person = personDoc.data()
  person.flipboard.isLoggedIn = true
  person.cookies = cookies
  await db.collection('people').doc(personDoc.id).set(person)
}

const start = async () => {
  const personDoc = await selectOne()
  const password = (await db.collection('common').doc('password').get()).data().password

  login(personDoc, password)
}

start()
