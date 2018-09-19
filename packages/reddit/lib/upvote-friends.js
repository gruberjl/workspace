/*
get a subbreddit
get submissions of a subbreddit (25)
filter to only see unread
mark all as read
pick random submissions and upvote
*/
const sleep = require('sleep-promise')
const {db} = require('../../firestore')

const upvoteUser = async (r, username) => {
  const user = await r.getUser(username)
  const submissions = await user.getSubmissions()

  for (let i = 0; i < submissions.length; i++) {
    const s = submissions[i]
    const isLiked = s.likes || false

    await sleep(Math.floor(Math.random() * 5000))
    if (!isLiked && !s.locked && !s.archived) {
      await s.upvote()
    }
  }
}

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

const getFriendsUsernames = async (personDoc) => {
  const snapshot = await db.collection('people').get()
  const usernames = []
  snapshot.forEach(doc => {
    if (doc.id == personDoc.id) return
    if (!doc.data().reddit) return
    if (!doc.data().reddit.username) return
    usernames.push(doc.data().reddit.username)
  })

  return usernames
}

const upvoteFriends = async (r, personDoc) => {
  const friends = await getFriendsUsernames(personDoc)
  const usernames = shuffle(friends)

  for (let i = 0; i < usernames.length; i++) {
    await upvoteUser(r, usernames[i])
  }
}

module.exports = {upvoteFriends}
