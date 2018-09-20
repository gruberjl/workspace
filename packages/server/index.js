const {createServer} = require('./lib/express')

const start = async () => {
  require('./lib/https-proxy')
  const app = await createServer()

  app.listen(3000, () => console.log('Example app listening on port 3000!'))
}

start()
