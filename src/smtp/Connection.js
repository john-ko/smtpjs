const parser = require('./parser/parser')
const mailGenerator = require('./mail')

class Connection {
  constructor (socket, options = {}) {
    this._socket = socket
    this._schema = options.schema || {}
    this._schema.data
    this._parse = options.parse
    this._data = false
    this._mail = mailGenerator()
    this._send = (message) => {
      this._socket.write(message)
    }

    this._send('220 smtp.example.com Simple Mail Transfer Service Ready\r\n')

    this._socket.on('data', this.onData.bind(this))
    this._socket.on('close', () => {
      this._socket.destroy()
    })
  }

  onData (buffer) {
    const line = buffer.toString()

    console.log(' - ', line)

    this.parse(line)
  }

  parse (line = '') {
    if (this._data) {
      return this.runData(line)
    }

    const { action, params } =  parser(line)

    console.log(action)
    return this.run(action, params)
  }

  runData (line) {
    if (line === '\r\n.\r\n' || line === '.\r\n') {
      this._data = false

      return this._send('250 Ok: queued as 12345')
    }

    return this._mail.addMessage(line)
  }

  parseSchema (schema = {}) {
    if (schema.data && typeof schema.data === 'function') {
      const data = schema.data()
    }
  }

  run (action, params) {
    if (this._schema['events'] && this._schema['events'][action]) {
      this._schema['events'][action]({
        action,
        params,
      })
    }

    if (action === 'EHLO') {
      return this._send('250 smtp.example.com, Hi! you sent me a EHLO')
    }

    if (action === 'HELO') {
      return this._send('250 smtp.example.com, I am glad to meet you\r\n')
    }

    if (action === 'MAIL FROM') {
      this._mail.setFromSender(params)
      return this._send('250 Ok\r\n')
    }

    if (action === 'RCPT TO') {
      this._mail.addRecipient(params)
      return this._send('250 Ok\r\n')
    }

    if (action === 'DATA') {
      // new thing we have to run
      this._data = true
      return this._send('354 End data with <CR><LF>.<CR><LF>')
    }

    if (action === 'QUIT') {
      return this._send('221 Bye')
      // close connection
    }
  }

  getMail () {
    return this._mail.getMail()
  }
}

module.exports = Connection