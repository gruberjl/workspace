const props = (max_id) => ({
  lang:'en',
  q: '#office365 OR #Microsoft OR #MicrosoftTeams OR #MicrosoftExchange OR #ExchangeOnline',
  result_type: 'popular',
  count: 200,
  max_id,
  include_entities: true
})

const search = async (client) => {
  const tweets = []
  let max_id

  for (let i = 0; i < 1; i++) {
    const response = await client.get('search/tweets', props(max_id))
    max_id = response.statuses[response.statuses.length-1].id_str

    if (i>0) response.statuses.shift()
    response.statuses.forEach(tweet => {
      if (tweet.possibly_sensitive) return
      if (tweet.user.followers_count < 2000) return
      if (tweet.user.screen_name == 'gruberjl') return
      tweets.push(tweet)
    })
  }

  return tweets
}

module.exports = {search}
