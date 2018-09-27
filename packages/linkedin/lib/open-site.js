const Driver = require('../../driver')
const {By, Key} = Driver.webdriver

const openSite = async (personDoc, driver) => {
  await driver.get('https://www.linkedin.com/')

  const onboardingClass = 'js-takeover-follows-onboarding__dismiss-button'
  const onboardingModel = await driver.findElement(By.className(onboardingClass)).catch(() => {})
  if (onboardingModel) await onboardingModel.click()

  const privacyClass = 'artdeco-dismiss'
  const privacyButton = await driver.findElement(By.className(privacyClass)).catch(() => {})
  if (privacyButton) await privacyButton.click()

  await driver.sleep(2000)
}

module.exports = {openSite}
