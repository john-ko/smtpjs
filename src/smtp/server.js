const SMTPServer = require('./SMTPServer.js')
const repl = require('./repl')

const schema = {
  data () {
    return {
      accept: true
    }
  },
  events: {
    HELO: (ctx) => {
      console.log(this.accept)
      this.accept = false
      console.log(ctx)
    },
    ELHO: (ctx) => {
      console.log(this.accept)
    }
  }
}

const server = new SMTPServer(schema)
const replOptions = {
  getConnectionCount: () => server.getConnectionCount(),
  list: () => server.list(),
  send: (id, line) => server.send(id, line),
  getMail: (id) => server.getMail(id)
}

repl(replOptions)

