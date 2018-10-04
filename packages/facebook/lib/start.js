const Driver = require('../../driver')
const {db} = require('../../firestore')
const {findUnpostedArticles} = require('./find-unposted-articles')
const {postToGroup} = require('./post-to-group')

const start = async () => {
  const articles = await findUnpostedArticles()
  if (articles.length == 0) return

  const driver = await Driver.build()
  const gruberjl = await db.collection('common').doc('gruberjl').get()
  await Driver.getCookies(driver, gruberjl)

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i].data()
    const message = `${article.description} ${article.url}`

    for (let j = 0; j < article.channels.length; j++) {
      const channel = article.channels[j]
      if (channel.provider == 'facebook' && channel.posted != true) {
        await postToGroup(driver, channel.url, message)
        article.channels[j].posted = true
        article.channels[j].postedAt = new Date().getTime()
        article.channels[j].postedBy = 'gruberjl'
      }
    }

    await articles[i].ref.set(article)
  }
}

module.exports = {start}
