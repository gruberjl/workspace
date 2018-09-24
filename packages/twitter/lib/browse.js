const arrayShuffle = require('array-shuffle')
const sleep = require('sleep-promise')
const {writeMessage} = require('../../messages')
const {retweet, like} = require('./interact')

const search = (personDoc, client) => {
  const q = '#office365 OR #Microsoft OR #MicrosoftTeams OR #MicrosoftExchange OR #ExchangeOnline'

  return client.get('search/tweets', {q, result_type:'popular', count:12}).then(response => {
    const limit = Math.floor(Math.random() * 10) + 1
    return arrayShuffle(response.statuses).slice(limit)
  }).catch(err => {
    return writeMessage('error', 'twitter', err[0].message, 'browse', {user:personDoc.id})
      .then(() => [])
  })
}

const timeline = async (personDoc, client) => {
  return client.get('statuses/home_timeline', {count:12}).then(response => {
    const limit = Math.floor(Math.random() * 10) + 1
    return arrayShuffle(response).slice(limit)
  }).catch(err => {
    return writeMessage('error', 'twitter', err[0].message, 'browse', {user:personDoc.id})
      .then(() => [])
  })
}

const leaders = async (personDoc, client) => {
  return client.get('statuses/user_timeline', {screen_name:'gruberjl', count:1})
    .catch(err =>
      writeMessage('error', 'twitter', err[0].message, 'browse', {user:personDoc.id}).then(() => [])
    )
}

const engage = async (personDoc, client, tweets) => {
  await sleep(60000)
  const t = tweets.filter(tweet => !tweet.favorited && !tweet.retweeted)

  for (let i = 0; i < t.length; i++) {
    const engageType = Math.floor(Math.random() * 2)
    if (engageType == 0)
      await retweet(personDoc, client, t[i].id_str)
    else
      await like(personDoc, client, t[i].id_str)
  }
}

const browse = async (personDoc, client) => {
  const searchPromise = search(personDoc, client)
  const timelinePromise = timeline(personDoc, client)
  const leadersPromise = leaders(personDoc, client)

  return Promise.all([searchPromise, timelinePromise, leadersPromise]).then(promises => {
    const tweets = [].concat(...promises)
    return engage(personDoc, client, tweets)
  })
}

module.exports = {browse}
