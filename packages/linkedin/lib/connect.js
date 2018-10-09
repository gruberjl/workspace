const url = 'https://www.linkedin.com/mynetwork/'
const {By, Key} = require('../../driver').webdriver

const scrollDown = async (driver) => {
  const times = 10
  const body = driver.findElement(By.tagName('Body'))

  for (let i=0; i < times; i++) {
    await body.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(500)
  }
}

const connect = async (driver) => {
  if (!driver) throw 'linkedin/connect: Driver is required'

  await driver.get(url)
  await driver.sleep(5000)
  await scrollDown(driver)

  const connectBtns = await driver.findElements(By.className('button-secondary-small'))

  connectBtns.forEach(async (connectBtn) => {
    await driver.executeScript('arguments[0].scrollIntoView(true);', connectBtn)
    await connectBtn.click()
    await driver.sleep(1000)
  })

  await driver.sleep(10000)

  return driver
}

module.exports = {connect}
