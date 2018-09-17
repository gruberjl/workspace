const url = 'https://twiends.com/home'
const {By} = require('../../../driver').webdriver

const follow = async (driver) => {
  if (!driver) throw 'twitter/tweinds-follow: Driver is required'

  await driver.get(url)
  await driver.sleep(2000)

  await driver.findElement(By.className('mask'))
  await driver.executeScript('document.elementFromPoint(10, 10).click()')
  await driver.sleep(1000)

  let followButtons = []

  do {
    followButtons = await driver.findElements(By.className('mainbut'))
    if (followButtons.length > 0) {
      await followButtons[0].click()
      await driver.sleep(500)
    }
  } while (followButtons.length > 0)

  return driver
}

module.exports = {follow}
