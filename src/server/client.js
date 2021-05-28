
const fs = require('fs')
const resolvePath = require('resolve-path')

module.exports = (request, reply) => {
  const stream = fs.createReadStream(resolvePath('build/index.html'))
  reply.type('text/html').send(stream)
}
