const {db} = require('../../firestore')
const Driver = require('../../driver')
const {login} = require('./login')

const getLinkedInUsers = async () => {
  const snapshot = await db.collection('people').get()
  const people = []
  snapshot.forEach(person => {
    const data = person.data()
    const {username, idDisabled, isLoggedIn} = data.linkedin
    if (username && !idDisabled && !isLoggedIn) {
      people.push(person)
    }
  })
  return people
}

const start = async () => {
  const people = await getLinkedInUsers()
  const password = (await db.collection('common').doc('password').get()).data().password

  for (let i = 0; i < people.length; i++) {
    const person = people[i]
    const driver = await Driver.build()
    await Driver.getCookies(driver, person)
    const email = person.data().email

    await login(email, password, driver)
    await Driver.saveCookies(driver, person, {linkedin: {isLoggedIn:true}})
  }
}

start()
