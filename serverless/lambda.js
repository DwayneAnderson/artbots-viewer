const awsLambdaFastify = require('aws-lambda-fastify')
const init = require('./functions/tweets')

const proxy = awsLambdaFastify(init())

exports.handler = proxy
