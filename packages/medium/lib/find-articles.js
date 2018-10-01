const {db} = require('../../firestore')

const findArticles = async (personDoc) => {
  const snapshot = await db.collection('articles').orderBy('created').get()
  const articles = []
  snapshot.forEach(async doc => {
    const read = doc.data().read
    if (!read[personDoc.id]) {
      articles.push(doc)
    }
  })

  return articles
}

module.exports = {findArticles}
