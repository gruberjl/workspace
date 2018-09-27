const util = require('util')
const request = util.promisify(require('request'))

const downloadRoadmap = async () => {
  let res

  try {
    res = await request('https://roadmap-api.azurewebsites.net/api/features')
  } catch (e) {
    console.log('Error getting Office 365 roadmap')
  }

  return JSON.parse(res.body)
}

module.exports = {downloadRoadmap}
