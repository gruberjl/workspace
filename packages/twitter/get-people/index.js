const {db} = require('../../firestore')

// Get people that have a twitter account, that's not disabled, but are not authenticated with the app.
const notOauthed = async () => {
  const snapshot = await db.collection('people').get()
  const people = []
  snapshot.forEach(personDoc => {
    const data = personDoc.data().twitter
    if (data.username && !data.isDisabled && !data.accessToken) {
      people.push(personDoc)
    }
  })

  people.forEach((person) => {
    const data = person.data()
    console.log(data.twitter.username)
  })
}

// Get people that don't have a Twitter account.
const withoutTwitter = async () => {
  const peopleDocs = await db.collection('people').get()
  peopleDocs.forEach(person => {
    const data = person.data().twitter

    if (!data.username && !data.isDisabled) {
      console.log(person.data().email)
    }
  })
}

notOauthed()
withoutTwitter()
