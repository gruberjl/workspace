const sleep = require('sleep-promise')
const {db, save} = require('../firestore')
const Driver = require('../driver')

const start = async () => {
  const personDoc = await db.collection('common').doc('gruberjl').get()

  const driver = await Driver.build(personDoc)

  await sleep(60000)

  const cookies = await driver.manage().getCookies()
  const data = {cookies, isLoggedIn:true}

  await save(personDoc, {linkedin: data})
}

start()
