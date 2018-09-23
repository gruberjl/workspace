const {By} = require('../../driver').webdriver
const {db} = require('../../firestore')
const {flipArticle} = require('./flip-article')

const getFlipped = async (personDoc) => {
  const doc = await db.collection('apps').doc('flipboard').collection('people').doc(personDoc.id).get()

  if (!doc) return []
  return doc.data().flipped
}

const browseMagazine = async (driver, personDoc) => {
  const appDoc = await db.collection('apps').doc('flipboard').get()
  const flipped = await getFlipped(personDoc)

  await driver.get(appDoc.data().magazine)

  const statEls = driver.findElements(By.className('stat-label'))
  for (const statEl of statEls) {
    await flipArticle(driver, statEl, flipped)
  }
}

modul.exports = {browseMagazine}
