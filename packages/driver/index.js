const chrome = require('./chrome')
const webdriver = require('selenium-webdriver')
const {getCookies} = require('./get-cookies')
const {saveCookies} = require('./save-cookies')
const {read} = require('./lib/read')

const build = async (personDoc) => {
  const driver = await chrome.build()

  if (personDoc) await getCookies(driver, personDoc)

  return driver
}

module.exports = {chrome, build, webdriver, getCookies, saveCookies, read, By:webdriver.By, Key:webdriver.Key}
