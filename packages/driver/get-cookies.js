const getCookies = async (driver, personDoc) => {
  await driver.get('http://gitbit.org')

  const cookies = personDoc.data().cookies
  if (!cookies) return

  for (let i = 0; i < cookies.length; i++) {
    await driver.manage().addCookie(cookies[i])
  }
}

module.exports = {getCookies}
