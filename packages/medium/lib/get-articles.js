const {db} = require('../../firestore')

const getArticles = async () => {
  const snapshot = await db.collection('articles').orderBy('created').get()
  const articles = []

  snapshot.forEach(article => {
    articles.push(article)
  })

  return articles
}

module.exports = {getArticles}
