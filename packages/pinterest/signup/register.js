const {db} = require('../../firestore')
const Driver = require('../../driver')
const {By} = Driver.webdriver

const register = async (driver, personDoc) => {
  const passwordDoc = await db.collection('common').doc('password').get()

  const age = (new Date()).getFullYear() - personDoc.data().info.birthyear
  const email = personDoc.data().email
  const password = passwordDoc.data().password

  const elEmail = driver.findElement(By.id('email'))
  const elPassword = driver.findElement(By.id('password'))
  const elAge = driver.findElement(By.id('age'))

  await elEmail.sendKeys(email)
  await elPassword.sendKeys(password)
  await elAge.sendKeys(age)

  await driver.findElement(By.className('SignupButton')).click()
  await driver.sleep(1000)
}

module.exports = {register}
