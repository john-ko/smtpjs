const net = require('net')

class Client {
  constructor () {
    this._socket = new net.Socket()
    this._socket.connect(1337, '127.0.0.1', () => {
      console.log('Connected')
      this._socket.write('Hello, server! Love, Client.')
    })

    this._socket.on('data', this.onData.bind(this))
    this._socket.on('close', () => {
      this._socket.destroy()
    })
  }

  onData (buffer) {
    const line = buffer.toString()

    console.log(' - ', line)
  }
}

module.exports = Client