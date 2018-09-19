/*
get a subbreddit
get submissions of a subbreddit (25)
filter to only see unread
mark all as read
pick random submissions and upvote
*/
const sleep = require('sleep-promise')

const subreddits = ['Technology', 'Sysadmin', 'Microsoft', 'Office365']

const getSubreddit = async (r, name) => {
  const subreddit = await r.getSubreddit(name)
  const rising = await subreddit.getRising()

  for (let i = 0; i < rising.length; i++) {
    await sleep(Math.floor(Math.random() * 5000))
    if (Math.floor(Math.random() * 10) == 1 && !rising[i].likes)
      await rising[i].upvote()
  }
}

const browseSubreddit = async (r) => {
  for (let i = 0; i < subreddits.length; i++) {
    await getSubreddit(r, subreddits[i])
  }
}

module.exports = {browseSubreddit}
