const {By} = require('../../driver').webdriver

const postToGroup = async (driver, url, message) => {
  if (!driver) throw 'LinkedIn/post-to-group: Driver is required'
  if (!message) throw 'LinkedIn/post-to-group: message is required'

  await driver.get(url)
  await driver.sleep(5000)

  try {
    await driver.findElement(By.className('artdeco-dismiss')).click()
    await driver.sleep(1000)
  } catch(e) {
    // The try/catch will close a pop up if it exists. If it doesn't exist, the catch will be thrown therefore it can be ignored.
  }

  await driver.findElement(By.css('.sharing-create-share-view__create-content button')).click()
  await driver.sleep(3000)

  const titleBox = await driver.findElement(By.className('mentions-texteditor__contenteditable'))
  await titleBox.sendKeys(message)
  await driver.sleep(1000)

  const submitBtn = await driver.findElement(By.className('sharing-subaction-bar__post-button'))
  await driver.executeScript('arguments[0].scrollIntoView(false);', submitBtn)
  await submitBtn.click()
  await driver.sleep(5000)
}

module.exports = {postToGroup}
