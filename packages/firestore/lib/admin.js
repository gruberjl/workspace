const {join} = require('path')
const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(join(__dirname, '..', 'secret.json'))
})

module.exports = admin
