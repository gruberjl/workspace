const {db} = require('../firestore')

const writeMessage = async (level, packag, text, file, details) => {
  const created = new Date().getTime()
  const data = { created, level, packag, text, file, details}
  if (data.text && typeof data.text != 'string')
    data.text = data.text.toString()

  try {
    await db.collection('messages').add(data)
  } catch (e) {
    console.log('could not write data to firestore message')
    console.log(data)
  }

}

module.exports = {writeMessage}
