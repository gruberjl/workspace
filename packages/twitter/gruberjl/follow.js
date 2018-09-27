const sleep = require('sleep-promise')
const {getFriends} = require('./get-friends')

const getUsers = tweet => tweet.user

const uniqueUser = (acc, user) => {
  acc[user.id_str] = user
  return acc
}

const byPopularity = (a, b) => a.followers_count < b.followers_count ? -1 : 1

const follow = async (client, tweets) => {
  const friends = (await getFriends(client)).map(user => user.id_str)

  const usersToFollow = Object.values(tweets.map(getUsers).reduce(uniqueUser, {})).sort(byPopularity)

  let followed = 0

  for (let i = 0; i < usersToFollow.length; i++) {
    const user_id = usersToFollow[i].id_str
    if (followed < 25 && friends.indexOf(user_id) == -1) {
      followed++
      await client.post('friendships/create', {user_id})
      await sleep(2000)
    }
  }
}

module.exports = {follow}
