const sleep = require('sleep-promise')
const {db} = require('../firestore')
const Driver = require('../driver')

const start = async () => {
  const personDoc = await db.collection('common').doc('gruberjl').get()
  const providers = ['scoopIt', 'flipboard', 'medium', 'digg', 'mix', 'stumbleupon', 'reddit', 'twitter', 'facebook', 'bizsugar', 'pinterest', 'linkedin', 'tumblr']

  for (let i = 0; i < providers.length; i++) {
    if (!personDoc.data()[providers[i]].cookies) {

    }
  }

  const driver = await Driver.build(personDoc)

  await sleep(60000)

  const person = personDoc.data()
  const cookies = await driver.manage().getCookies()

  cookies.forEach(cookie => {
    person.cookies.push(cookie)
  })

  await db.collection('common').doc('gruberjl').set(person)
}

start()
