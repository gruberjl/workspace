const {db} = require('../firestore')

const writeMessage = async (level, packag, text, file, details) => {
  const created = new Date().getTime()
  const data = { created, level, packag, text, file, details}
  if (typeof data.text != 'string')
    data.text = data.text.toString()
  await db.collection('messages').add(data)
}

module.exports = {writeMessage}
