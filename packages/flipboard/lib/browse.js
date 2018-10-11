const Driver = require('../../driver')
const {By, Key} = Driver.webdriver
const random = require('../../lib/random')

const browse = async (personDoc) => {
  const driver = await Driver.build(personDoc)
  await driver.get('https://flipboard.com/')
  await driver.sleep(3000)

  const body = await driver.findElement(By.css('body'))
  await driver.sleep(1000)
  await body.sendKeys(Key.PAGE_DOWN)
  await driver.sleep(1000)

  try {
    await driver.findElement(By.css('.buton.not-now')).click()
  } catch(e) {}

  const countOfArticlesToRead = random(1, 5)
  const statEls = await driver.findElements(By.className('stat-label'))

  for (let i = 0; i < countOfArticlesToRead; i++) {
    const statEl = statEls[i]
    await driver.executeScript('arguments[0].scrollIntoView(false);', statEl)
    await statEl.click()
    await driver.sleep(5000)
    const actionEls = await driver.findElements(By.className('detail-social-action'))
    await driver.executeScript('arguments[0].scrollIntoView(false);', actionEls[1])
    await actionEls[1].click()
    await driver.sleep(2000)
    const closeBtn = await driver.findElement(By.className('close-button'))
    await driver.executeScript('arguments[0].scrollIntoView(false);', closeBtn)
    await closeBtn.click()
    await driver.sleep(6000)
  }

  await driver.quit()
}

module.exports = {browse}
