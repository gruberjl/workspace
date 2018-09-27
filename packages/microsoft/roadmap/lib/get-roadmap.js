const {db} = require('../../../firestore')

const getRoadmap = async () => {
  const snapshot = await db.collection('roadmap').get()

  const roadmap = []
  snapshot.forEach(item => {
    item.push(roadmap)
  })

  return roadmap
}

module.exports = {getRoadmap}
