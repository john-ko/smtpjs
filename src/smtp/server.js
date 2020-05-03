const _ = require('lodash')
const Logger = require('./logger')
const Schema = require('./schema-s')
const shortid = require('shortid')
const tls = require('tls')
const fs = require('fs')
const net = require('net')
const Connection = require('./cxonnection.js')

const ENV = process.env.NODE_ENV
const isDev = ENV === undefined || ENV === 'development'

class Server {
  constructor (schema, { logger }) {
    this.logger = logger
    this.schema = schema
    this.options = this.getOptions(schema)


  }

  static factory (schema, dependencies) {
    if (!dependencies.logger) {
      dependencies.logger = new Logger()
    }

    return new Server(Schema.factory(schema), dependencies)
  }

  getOptions (schema = {}) {
    const key = _.get(schema, 'config.key', '')
    const cert = _.get(schema, 'config.cert', '')

    return { key, cert }
  }

  createServer (socket) {
    const parse = SMTPServer.parse
    const state = SMTPServer.state
    const id = shortid.generate()
    socket.id = id
    const connection = new Connection(socket, { parse, state, schema: this._schema })
    this._connections[id] = connection

    socket.on('error', (e) => {
      this.logger.error('error', e)
    })

    socket.on('close', (args) => {
      const id = socket.id || ''
      this.removeId(id)
      this.logger.info(`closed connection - ${socket.id}`)
    })
  }
}

module.exports = Server