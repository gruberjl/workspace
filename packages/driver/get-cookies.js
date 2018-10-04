const providers = ['scoopIt', 'flipboard', 'medium', 'digg', 'mix', 'stumbleupon', 'reddit', 'twitter', 'facebook', 'bizsugar', 'pinterest', 'linkedin', 'tumblr']

const addCookies = async (driver, cookies) => {
  for (let i = 0; i < cookies.length; i++) {
    await driver.manage().addCookie(cookies[i])
  }
}

const getCookies = async (driver, personDoc) => {
  await driver.get('http://gitbit.org')

  const cookies = personDoc.data().cookies
  if (cookies) await addCookies(driver, cookies)

  for (let i = 0; i < providers.length; i++) {
    const providerKey = providers[i]
    const provider = personDoc.data()[providerKey]
    if (provider.cookies) await addCookies(driver, provider.cookies)
  }
}

module.exports = {getCookies}
