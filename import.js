const {people} = require('./packages/data')
const {db} = require('./packages/firestore')

const start = async () => {
  for (let i = 0; i < people.length; i++) {
    const p = people[i]

    const data = {
      info: {
        first: p.first,
        last: p.last,
        title: p.title,
        department: p.department,
        sex: p.sex,
        birthmonth: p.birthmonth,
        birthday: p.birthday,
        birthyear: p.birthyear
      },
      email: p.email,
      google: {
        gmail: p.gmail || false,
        plusUrl: p.GooglePlus || false
      },
      scoopIt: {
        username: p.ScoopIt || false
      },
      flipboard: {
        username: p.flipboard || false
      },
      medium: {
        username: p.medium || false
      },
      digg: {
        username: p.digg || false
      },
      mix: {
        username: p.Mix || false
      },
      stumbleupon: {
        username: p.stumbleupon || false
      },
      reddit: {
        username: p.reddit || false
      },
      twitter: {
        username: p.twitter || false,
        isDisabled: p.twitter_disabled || false
      },
      facebook: {
        username: p.facebook || false
      },
      bizsugar: {
        username: p.BizSugar || false
      },
      pinterest: {
        username: p.pintrest || false
      },
      linkedin: {
        username: p.linkedin || false
      },
      tumblr: {
        username: p.tumblr || false
      }
    }
    console.log('')
    console.log('')
    console.log(`${p.first}.${p.last}`)
    console.log(data)
    console.log('')
    console.log('')
    await db.collection('people').doc(`${p.first}.${p.last}`).set(data)
  }
}

start()
