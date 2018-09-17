const {join} = require('path')
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(join(__dirname, 'secret.json'))
})

const db = admin.firestore()
db.settings({timestampsInSnapshots: true})

module.exports = {db, admin}
