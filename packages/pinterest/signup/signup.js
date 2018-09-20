const Driver = require('../../driver')
const {register} = require('./register')

const signup = async (personDoc) => {
  const driver = await Driver.build()
  await driver.get('https://www.pinterest.com/')

  await register(driver, personDoc)
}

module.exports = {signup}
