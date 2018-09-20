const fs = require('fs')
const {join} = require('path')
const httpProxy = require('http-proxy')

const certPath = join(__dirname, 'https-cert.pfx')

httpProxy.createProxyServer({
  target:'http://localhost:3000',
  ssl: {
    pfx: fs.readFileSync(certPath),
    passphrase: 'password'
  }
  // secure: true
}).listen(3001)

console.log('Proxy running on https://localhost:3001')
