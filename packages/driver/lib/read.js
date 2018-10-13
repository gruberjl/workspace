const {By, Key} = require('selenium-webdriver')
const random = require('../../lib/random')

const isBottomOfPage = async (driver) => await driver.executeScript(
  'if (document.body.scrollHeight == window.innerHeight + window.scrollY) { return true; } else { return false; }'
)

const read = async (driver, url) => {
  if (url) await driver.get(url)
  await driver.sleep(3000)

  const timeout = (new Date().getTime()) + (1000 * 60)
  const body = await driver.findElement(By.css('body'))
  let isBottom = false

  while (!isBottom) {
    await driver.sleep(random(2000, 5000))
    await body.sendKeys(Key.PAGE_DOWN)
    isBottom = await isBottomOfPage(driver)
    if (new Date().getTime() > timeout) isBottom = true
  }
}

module.exports = {read}
