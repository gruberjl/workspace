const chrome = require('./chrome')
const webdriver = require('selenium-webdriver')

const build = async () => {
  const driver = await chrome.build()

  return driver
}

module.exports = {chrome, build, webdriver}
