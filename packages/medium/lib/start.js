const {browse} = require('./browse')
const {readArtices} = require('./read-articles')

const start = async (personDoc) => {
  await browse(personDoc)
  await readArtices(personDoc)
}

module.exports = {start}
