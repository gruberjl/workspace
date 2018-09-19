const {db} = require('../../firestore')
const {writeMessage} = require('../../messages')

const findArticle = async () => {
  const snapshot = await db.collection('articles').orderBy('created').get()
  let article
  snapshot.forEach(async doc => {
    if (!article) {
      const channels = doc.data().channels
      const toSubmit = channels.filter(c => c.provider=='reddit' && c.posted == false)
      if (toSubmit.length > 0) {
        article = doc
      }
    }
  })

  return article
}

const getSubreddit = (article) => {
  const channels = article.data().channels
  const toSubmit = channels.filter(c => c.provider=='reddit' && c.posted == false)
  return toSubmit[0].subreddit
}

const saveArticle = async (article, subreddit, personDoc) => {
  const data = article.data()
  const idx = data.channels.findIndex(c => c.subreddit == subreddit)
  data.channels[idx].posted = true
  data.channels[idx].postedAt = new Date().getTime()
  data.channels[idx].postedBy = personDoc.id
  await db.collection('articles').doc(article.id).set(data)
}

const submitToReddit = (r, subreddit, article, personDoc) => {
  const title = article.data().title
  const url = article.data().url

  return r.getSubreddit(subreddit).submitLink({title, url}).then(() => {
    return saveArticle(article, subreddit, personDoc)
  }).catch(err => {
    const details = {
      article: article.id,
      subreddit,
      person: personDoc.id
    }
    return writeMessage('error', 'reddit', err, 'submit-link', details)
  })
}

const submitLink = async (r, personDoc) => {
  const article = await findArticle()
  if (article) {
    const subreddit = getSubreddit(article)
    await submitToReddit(r, subreddit, article, personDoc)
  }
}

module.exports = {submitLink}
