const Driver = require('../driver')
const {db} = require('../firestore')
const findArticles = require('./lib/find-articles')
const {read} = require('./lib/read')

const start = async (personDoc) => {
  if (personDoc.data().medium.isLoggedIn) {
    const articles = await findArticles(personDoc)

    if (articles.length == 0) return

    const driver = Driver.build(personDoc)

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i].data()
      await read(driver, article.url)

      if (!article.read) article.read = {}
      article.read[personDoc.id] = true
      await db.collection('articles').doc(articles[i].id).set(article)
    }
  }
}

module.exports = {start}
