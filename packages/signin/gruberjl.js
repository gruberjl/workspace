const sleep = require('sleep-promise')
const {db, save} = require('../firestore')
const Driver = require('../driver')

const provider = 'medium'

const start = async () => {
  // const personDoc = await db.collection('common').doc('gruberjl').get()
  const personDoc = await db.collection('people').doc('GitBit.LLC').get()

  const driver = await Driver.build(personDoc)

  await sleep(60000)

  const cookies = await driver.manage().getCookies()
  const data = personDoc.data()
  data[provider].cookies = cookies
  data[provider].isLoggedIn = true

  await personDoc.ref.set(data)
  await driver.quit()

  // await save(personDoc, {[provider]: data})
}

start()
