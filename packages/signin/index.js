const sleep = require('sleep-promise')
const {db} = require('../firestore')
const Driver = require('../driver')
const {getPerson} = require('./lib/get-person')

const {signin, isMatch, save} = require('./providers/medium')

const start = async () => {
  const person = await getPerson(isMatch)
  if (person) {
    console.log(person.id)
  } else {
    console.log('no people matched the criteria in the get-person')
    return
  }
  const driver = await Driver.build(person)
  const password = (await db.collection('common').doc('password').get()).data().password

  await signin(driver, person, password)
  await sleep(60000)
  await Driver.saveCookies(driver, person)

  await save(person)
  await driver.quit()
}

// const open = async () => {
//   const person = await db.collection('people').doc('Barbara.Taylor').get()
//   await createDriver(person)
// }
// open()
start()
