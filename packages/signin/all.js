const sleep = require('sleep-promise')
const {db} = require('../firestore')
const Driver = require('../driver')

const getPeople = async () => {
  const snapshot = await db.collection('people').get()
  const people = []
  snapshot.forEach(p => {
    if (p.data().flipboard.isLoggedIn) {
      people.push(p)
    }
  })
  return people
}

const signin = async (personDoc) => {
  const driver = await Driver.build(personDoc)
  await driver.get(`http://gitbit.org/${personDoc.id}`)
  await driver.get('https://flipboard.com/')

  await sleep(300000)

  const cookies = await driver.manage().getCookies()
  const data = personDoc.data()
  data.flipboard.cookies = cookies

  await personDoc.ref.set(data)
  await driver.quit()
}

const start = async () => {
  const people = await getPeople()

  people.forEach(person => {
    // console.log(`${person.id} ${person.data().flipboard.cookies.length}`)
    signin(person)
  })
}

start()
