const {By, Key} = require('../../driver').webdriver

const isBottomOfPage = async (driver) => {
  return await driver.executeScript('if (document.body.scrollHeight == window.innerHeight + window.scrollY) { return true; } else { return false; }')
}

const randomNum = (low, high) => {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

const readUntilEnd = (driver, waitMin=1, waitMax=3) => new Promise(async (res) => {
  const body = await driver.findElement(By.css('body'))
  let isBottom = false

  while (!isBottom) {
    await driver.sleep(randomNum(waitMin, waitMax) * 1000)
    await body.sendKeys(Key.PAGE_DOWN)
    isBottom = await isBottomOfPage(driver)
  }

  res()
})

const clap = async (driver, clapMin=1, clapMax=5) => {
  const times = randomNum(clapMin,clapMax)
  const clapBtn = await driver.findElement(By.css('.postActions .clapButton'))
  await driver.executeScript('(document.getElementsByClassName(\'clapButton\')[0]).scrollIntoView()')
  const body = await driver.findElement(By.css('body'))
  await body.sendKeys(Key.ARROW_UP)
  await body.sendKeys(Key.ARROW_UP)
  await body.sendKeys(Key.ARROW_UP)
  await body.sendKeys(Key.ARROW_UP)
  await body.sendKeys(Key.ARROW_UP)

  for (let i = 0; i < times; i++) {
    await driver.sleep(250)
    try {
      await clapBtn.click()
    } catch (e) {
      console.log('error clapping')
      console.log(e)
      console.log('')
    }
  }

  await driver.sleep(1000)
}

const readNextArticle = async (driver) => {
  await driver.findElement(By.css('.js-postFooterPlacements .row .col:nth-child(3) a')).click()
  await driver.sleep(1000)
  await readUntilEnd(driver, 1, 2)
  await clap(driver)
}

const read = async (driver, url) => {
  await driver.get(url)
  await driver.sleep(1000)
  await readUntilEnd(driver)
  await clap(driver, 40, 50)

  await readNextArticle(driver)
  await readNextArticle(driver)
}

module.exports = {read}
