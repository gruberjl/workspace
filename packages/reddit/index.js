const {login} = require('./lib/login')
const {submitLink} = require('./lib/submit-link')
const {browseSubreddit} = require('./lib/browse-subreddit')
const {getMessages} = require('./lib/get-messages')
const {upvoteFriends} = require('./lib/upvote-friends')

const start = async (personDoc) => {
  if (personDoc.data().reddit.refreshToken) {
    const r = await login(personDoc)
    await browseSubreddit(r)
    await submitLink(r, personDoc)
    await getMessages(r, personDoc)
    await upvoteFriends(r, personDoc)
  }
}

module.exports = {start}
