const {writeMessage} = require('../messages')

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message)
  console.log(error)
  writeMessage('error', 'unhandledRejection', error.message)
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message)
  console.log(error)
})
