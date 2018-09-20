require('chromedriver')
var webdriver = require('selenium-webdriver')

const build = async () => {
  const capabilities = webdriver.Capabilities.chrome()
  const options = { args: ['--disable-notifications'] }
  capabilities.set('chromeOptions', options)

  // const options = new Chrome.Options()
  // options.setUserPreferences({'profile.default_content_setting_values.notifications': 2})

  const driver = new webdriver.Builder()
    .withCapabilities(capabilities)
    .build()

  return driver
}

const destroy = async (driver) => {
  await driver.quit()
  driver = null
  return true
}

module.exports = {build, destroy}
