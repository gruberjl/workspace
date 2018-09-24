const {writeMessage} = require('../../messages')

const retweet = (personDoc, client, tweetId) => new Promise(res => {
  client.post(`statuses/retweet/${tweetId}`, {}).then(() => res())
    .catch(err => {
      writeMessage('error', 'twitter', err[0].message, 'interact-retweet', {user:personDoc.id}).then(() => res())
    })
})

const like = (personDoc, client, tweetId) => new Promise(res => {
  client.post('favorites/create', {id:tweetId}).then(() => res())
    .catch(err => {
      writeMessage('error', 'twitter', err[0].message, 'interact-like', {user:personDoc.id}).then(() => res())
    })
})

module.exports = {retweet, like}
