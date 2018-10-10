const Driver = require('../../driver')
const {db} = require('../../firestore')
const {getArticles} = require('./get-articles')
const {getPeople} = require('./get-people')
const {findUnreadArticles} = require('./find-unread-articles')
const {read} = require('./read')

const createOutput = (articles) => {
  const output = {}
  articles.forEach(article => {
    output[article.id] = article.data()
    if (!output[article.id].read) output[article.id].read = {}
  })

  return output
}

const start = async () => {
  const people = await getPeople()
  const articles = await getArticles()
  const output = createOutput(articles)
  const changed = {}

  for (let i = 0; i < people.length; i++) {
    const person = people[i]
    const unreadArticles = await findUnreadArticles(articles, people[i])

    if (unreadArticles.length > 0) {
      const driver = await Driver.build(person)
      for (let x = 0; x < unreadArticles.length; x++) {
        const article = unreadArticles[x]
        await read(driver, article.data().url)
        output[article.id].read[person.id] = true
        changed[article.id] = true
      }
      await driver.quit()
    }
  }

  const changedArticles = Object.keys(changed)
  for (let i = 0; i < changedArticles.length; i++) {
    const articleId = changedArticles[i]
    await db.collection('articles').doc(articleId).set(output[articleId])
  }
}

module.exports = {start}
