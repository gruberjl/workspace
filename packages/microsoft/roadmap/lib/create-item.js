const {db} = require('../../../firestore')

const createItem = async (newItem) => {
  const data = {
    id: newItem.id,
    modified: newItem.modified,
    cache: [newItem]
  }

  // db.collection('roadmap').
}

module.exports = {createItem}
