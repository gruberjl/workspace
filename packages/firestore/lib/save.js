const merge = require('deepmerge')

const save = async (doc, data) => {
  const latestDoc = await doc.ref.get()
  const merged = merge(latestDoc.data(), data)
  await latestDoc.ref.set(merged)
}

module.exports = save
