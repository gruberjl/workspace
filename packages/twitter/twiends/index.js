const {login} = require('./lib/login')
const {follow} = require('./lib/follow')
const {db} = require('../../firestore')

let nextRun

const shouldRun = (twiendsDoc) => {
  if (!nextRun) nextRun = (twiendsDoc.data().lastRun) + 60 * 60 * 24 * 1000

  const time = new Date().getTime()
  if (nextRun > time) return false

  nextRun = time + 60 * 60 * 24 * 1000

  return true
}

const start = async () => {
  const twiendsDoc = await db.collection('common').doc('twiends').get()
  if (!shouldRun(twiendsDoc)) return

  await db.collection('common').doc('twiends').set(
    Object.assign({}, twiendsDoc.data(), {lastRun:(new Date().getTime())})
  )

  const {username, password} = twiendsDoc.data()
  const driver = await login(username, password)
  await follow(driver)
  await driver.quit()
}

module.exports = {start}
