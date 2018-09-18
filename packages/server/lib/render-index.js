const {db} = require('../../firestore')

const renderIndex = async (req, res) => {
  const snapshot = await db.collection('messages').get()
  const messages = []
  snapshot.forEach(doc => messages.push(doc.data()))
  res.render('index', {flash: res.flash, messages})
}

module.exports = {renderIndex}
