const {db} = require('../../firestore')

const findUnpostedArticles = async () => {
  const snapshot = await db.collection('articles').orderBy('created').get()
  const articles = []
  snapshot.forEach(async doc => {
    const channels = doc.data().channels
    const toSubmit = channels.filter(c => c.provider=='linkedin' && c.posted == false)
    if (toSubmit.length > 0) {
      articles.push(doc)
    }
  })

  return articles
}

module.exports = {findUnpostedArticles}
