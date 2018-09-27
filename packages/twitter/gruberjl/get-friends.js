const getFriends = async (client) => {
  let cursor = -1, friends = []

  for (let i = 0; i < 15; i++) {
    if (cursor !== '0') {
      const response = await client.get('friends/list', {count:200, cursor})

      if (cursor == response.next_cursor_str) cursor = '0'
      else cursor = response.next_cursor_str

      friends = [].concat(response.users, friends)
    }
  }

  return friends
}

module.exports = {getFriends}
