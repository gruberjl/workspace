const Driver = require('../../driver')
const {By, Key} = Driver.webdriver

const login = async (email, password, driver) => {
  if (!driver) driver = await Driver.build()

  await driver.get('https://plus.google.com/people')

  const elEmail = driver.findElement(By.id('identifierId'))
  await elEmail.sendKeys(email)
  await elEmail.sendKeys(Key.ENTER)
  await driver.sleep(2000)

  const elPassword = driver.findElement(By.name('password'))
  await elPassword.sendKeys(password)
  await elPassword.sendKeys(Key.ENTER)
  await driver.sleep(2000)

  return driver
}

module.exports = {login}
