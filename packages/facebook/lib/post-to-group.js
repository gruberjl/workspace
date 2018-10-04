const {By} = require('../../driver').webdriver

const postToGroup = async (driver, groupUrl, message) => {
  if (!driver) throw 'Facebook/post-to-group: Driver is required'
  if (!groupUrl) throw 'Facebook/post-to-group: groupUrl is required'
  if (!message) throw 'Facebook/post-to-group: message is required'

  await driver.get(groupUrl)

  const textBox = await driver.findElement(By.name('xhpc_message_text'))
  await textBox.click()
  await driver.sleep(1000)

  const editBox = await driver.findElement(By.className('_5rpu'))
  await editBox.sendKeys(message)
  await driver.sleep(3000)

  const postBtn = await driver.findElement(By.className('_1mf7'))
  await driver.executeScript('arguments[0].scrollIntoView(false);', postBtn)
  await postBtn.click()
  await driver.sleep(5000)
}

module.exports = {postToGroup}
