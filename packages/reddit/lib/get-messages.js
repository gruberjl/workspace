const {writeMessage} = require('../../messages')

const getMessages = async (r, personDoc) => {
  const messages = await r.getInbox()

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i]
    if (message.new) {
      await writeMessage('info', 'reddit', message.body, 'private-message', {user:personDoc.id})
      await r.getMessage(message.name).markAsRead()
    }
  }
}

module.exports = {getMessages}
