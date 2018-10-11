const {db} = require('../firestore')
const Driver = require('../driver')
const {flipArticle} = require('./lib/flip-article')
const {browse} = require('./lib/browse')

const hasFlipped = (personDoc, articleDoc) => {
  const article = articleDoc.data()
  if (!article.flipped) return false
  return Boolean(article.flipped[personDoc.id])
}

const getArticles = async (personDoc) => {
  const snapshot = await db.collection('articles').get()
  const articles = []

  snapshot.forEach(articleDoc => {
    if (!hasFlipped(personDoc, articleDoc)) {
      articles.push(articleDoc)
    }
  })

  return articles
}

const start = async (personDoc) => {
  if (!personDoc.data().flipboard.isLoggedIn) return
  await browse(personDoc)
  const articles = await getArticles(personDoc)
  if (articles.length == 0) return

  const driver = await Driver.build()
  await Driver.getCookies(driver, personDoc)
  await driver.get('https://flipboard.com')

  for (let i = 0; i < articles.length; i++) {
    await flipArticle(driver, personDoc, articles[i])
  }

  await Driver.saveCookies(driver, personDoc, 'flipboard')
  await driver.quit()
}

module.exports = {start}
