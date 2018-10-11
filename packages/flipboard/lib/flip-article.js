const {By} = require('../../driver').webdriver
const {db} = require('../../firestore')

const saveFlip = async (personDoc, articleDoc) => {
  const data = articleDoc.data()
  if (!data.flipped) data.flipped = {}
  data.flipped[personDoc.id] = true
  await db.collection('articles').doc(articleDoc.id).set(data)
}

const flipArticle = async (driver, personDoc, articleDoc) => {
  const url = articleDoc.data().url
  const magazineUrl = (await db.collection('apps').doc('flipboard').get()).data().magazine
  await driver.get(magazineUrl)
  await driver.sleep(2500)

  try {
    await driver.findElement(By.css('.buton.not-now')).click()
  } catch(e) {}

  const statEls = await driver.findElements(By.className('stat-label'))
  let found = false

  for (const statEl of statEls) {
    if (!found) {
      await driver.executeScript('arguments[0].scrollIntoView(false);', statEl)
      await statEl.click()
      await driver.sleep(500)
      const linkEl = await driver.findElement(By.className('external-link'))
      const currentUrl = await linkEl.getAttribute('href')
      if (currentUrl.toLowerCase() == url.toLowerCase()) {
        found = true
        const actionEls = await driver.findElements(By.className('detail-social-action'))
        await driver.executeScript('arguments[0].scrollIntoView(false);', actionEls[1])
        await actionEls[1].click()
        await driver.sleep(500)
        await actionEls[0].click()
        await driver.sleep(500)
        const flipEl = await driver.findElement(By.className('share-flip__button-primary'))
        await driver.executeScript('arguments[0].scrollIntoView(false);', flipEl)
        await flipEl.click()
        await driver.sleep(3000)
        await saveFlip(personDoc, articleDoc)
      }

      const closeBtn = await driver.findElement(By.className('close-button'))
      await driver.executeScript('arguments[0].scrollIntoView(false);', closeBtn)
      await closeBtn.click()
      await driver.sleep(1000)
    }
  }
}

module.exports = {flipArticle}
