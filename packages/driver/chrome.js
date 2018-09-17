require('chromedriver')
var webdriver = require('selenium-webdriver')

const build = async () => {
  const driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()
    
  return driver
}

const destroy = async (driver) => {
  await driver.quit()
  driver = null
  return true
}

module.exports = {build, destroy}
