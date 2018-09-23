const {db} = require('../firestore')
const Driver = require('../driver')
const {flipArticle} = require('./lib/flip-article')

const hasFlipped = (personDoc, articleDoc) => {
  const article = articleDoc.data()
  if (!article.flipped) return false
  return Boolean(article.flipped[personDoc.id])
}

const start = async (personDoc, articleDoc) => {
  // const personDoc = await db.collection('people').doc('Adam.Tucker').get()
  // const articleDoc = await db.collection('articles').doc('OTlThhZRvboFLLVJN0t6').get()

  if (personDoc.data().flipboard.isLoggedIn && !hasFlipped(personDoc, articleDoc)) {
    const driver = await Driver.build()
    await driver.get('https://google.com')

    const cookies = personDoc.data().cookies
    for (let i = 0; i < cookies.length; i++) {
      await driver.manage().addCookie(cookies[i])
    }

    await driver.get('https://flipboard.com')
    await flipArticle(driver, personDoc, articleDoc)
    await driver.quit()
  }
}

const all = async () => {
  const articleDoc = await db.collection('articles').doc('OTlThhZRvboFLLVJN0t6').get()
  const peopleDocs = await db.collection('people').get()
  const people = []
  peopleDocs.forEach(person => {
    people.push(person)
  })

  for (let i = 0; i < people.length; i++) {
    await start(people[i], articleDoc)
  }
}

all()
