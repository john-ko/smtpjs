const Server = require('./src/smtp/server/Server.js')
const repl = require('./src/smtp/repl/repl')

const schema = {
  logger: {
    level: 'all',
  },
  config: {
    ip: '127.0.0.1',
    port: 1337,
    key: '',
    cert: '',
  },
  data () {
    return {
      accept: true
    }
  },
  error (error, mail) {
    this.logger.error(error)
    this.logger.info(mail)
  },
  done (mail) {
    return new Promise((resolve, reject) => {
      // save mail somewhere
      this.logger.info(mail)

      resolve('donzo')
    })
  },
  events: {
    HELO (ctx) {
      this.logger.debug(' - promise')
      return new Promise ((resolve, reject) => {
        this.logger.debug(' - timeout')
        setTimeout(() => {
          this.logger.info('wait 1 second')
          resolve('done')
        },1000)
      })
    },
    EHLO (ctx) {
      this.logger.log('EHLO called')
    },
    AUTH (ctx) {
      this.logger.log(ctx)
    }
  }
}

const server = Server.factory(schema)

const replOptions = {
  getConnectionCount: () => server.getConnectionCount(),
  list: () => server.list(),
  send: (id, line) => server.send(id, line),
  getMail: (id) => server.getMail(id)
}

repl(replOptions)
