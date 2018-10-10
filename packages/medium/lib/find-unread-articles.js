const findUnreadArticles = async (articlesSnapshot, personDoc) => {
  const articles = []

  articlesSnapshot.forEach(async doc => {
    const read = doc.data().read
    if (!read || !read[personDoc.id]) {
      articles.push(doc)
    }
  })

  return articles
}

module.exports = {findUnreadArticles}
