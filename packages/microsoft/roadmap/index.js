const {downloadRoadmap} = require('./download-roadmap')

const start = async () => {
  const newItems = await downloadRoadmap()
  console.log(newItems[0])
}

module.exports = {start}
start()
