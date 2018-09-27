const arrayShuffle = require('array-shuffle')
const sleep = require('sleep-promise')
const {writeMessage} = require('../../messages')

const doesMatchPattern = tweet => {
  const hashtags = tweet.entities.hashtags.map(h => h.text.toLowerCase())
  if (tweet.possibly_sensitive) return false
  if (tweet.user.followers_count < 2000) return false
  if (tweet.user.screen_name == 'gruberjl') return false

  if (hashtags.includes('office365')) return true
  if (hashtags.includes('microsoft')) return true
  if (hashtags.includes('microsoftteams')) return true
  if (hashtags.includes('microsoftexchange')) return true
  if (hashtags.includes('exchangeonline')) return true

  return false
}

const interact = async (client) => {
  const tweets = await client.get('statuses/home_timeline', {count:200, exclude_replies:true})

  const matched = arrayShuffle(tweets.filter(doesMatchPattern))
  const count = Math.floor(Math.random() * 15 - 10) + 10
  await sleep(30000)

  for (let i = 0; i < matched.length; i++) {
    const id = matched[i].id_str
    if (i<count) {
      if (Math.floor(Math.random() * 2) == 0)
        await client.post(`statuses/retweet/${id}`, {})
          .catch(err => writeMessage('error', 'twitter', err[0].message, 'gruberjl/interact', {id}))
      else
        await client.post('favorites/create', {id})
          .catch(err => writeMessage('error', 'twitter', err[0].message, 'gruberjl/interact', {id}))
      await sleep(10000)
    }
  }
}

module.exports = {interact}
