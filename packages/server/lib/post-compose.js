const {db} = require('../../firestore')

const composeReddit = (data) => {
  Object.keys(data)
    .filter(k => k.startsWith('reddit.'))
    .forEach(key => {
      const value = data[key]
      data.channels.push({
        provider: 'reddit',
        posted: false,
        subreddit: value
      })
      delete data[key]
    })
}

const postCompose = async (req, res, next) => {
  const created = new Date().getTime()
  const data = Object.assign({created, channels:[]}, req.body)
  composeReddit(data)

  db.collection('articles').add(data).then(() => {
    res.flash = {text:'saved!'}
    next()
  }).catch(err => {
    res.flash = {text:err}
    next()
  })
}

module.exports = {postCompose}
