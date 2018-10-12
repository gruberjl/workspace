const Driver = require('../../driver')
const {By,Key} = Driver.webdriver
const {read} = require('./read')

const browse = async (personDoc) => {
  if (!personDoc.data().medium.isLoggedIn) return

  const driver = await Driver.build(personDoc)
  await driver.get('https://medium.com/')
  const body = await driver.findElement(By.css('body'))
  await body.sendKeys(Key.PAGE_DOWN)
  await body.sendKeys(Key.PAGE_DOWN)
  await body.sendKeys(Key.PAGE_DOWN)
  await body.sendKeys(Key.PAGE_DOWN)
  await body.sendKeys(Key.PAGE_DOWN)
  await driver.sleep(5000)

  const posts = await driver.findElements(By.className('extremePostPreview'))
  let url
  for (let i=0; i<posts.length; i++) {
    if (!url) {
      const premium = await posts[i].findElement(By.className('svgIcon--star')).catch(() => undefined)
      if (!premium) {
        url = await posts[i].findElement(By.css('.ds-link.ds-link--stylePointer')).getAttribute('href').catch(() => undefined)
      }
    }
  }

  if (url)
    await read(driver, url)
  await driver.quit()
}

module.exports = {browse}
