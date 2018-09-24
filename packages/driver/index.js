const chrome = require('./chrome')
const webdriver = require('selenium-webdriver')
const {getCookies} = require('./get-cookies')
const {saveCookies} = require('./save-cookies')

const build = async () => {
  const driver = await chrome.build()

  return driver
}

module.exports = {chrome, build, webdriver, getCookies, saveCookies}
