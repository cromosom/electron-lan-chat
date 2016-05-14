const $ = require('jquery')
const net = require('net')
const Socket = net.Socket

class Scan {
  constructor() {
    const domStack = {}

    this.cacheDom()
    this.bindEvents()
  }

  cacheDom () {
    this.domStack = {
      scanBtn : $('#btn-scan')
    }
  }

  bindEvents () {
    this.domStack.scanBtn.on('click', this.scanServers.bind(this) )

  }

  scanServers () {
    let LAN = '192.168.178'
    let PORT = '8080'

    for (let i = 1; i <= 255; i++) {
      this.checkPort(PORT, LAN + '.' + i, function (error, status, host, port) {
        if ( status == 'open' ) {
          console.log(`Server found: ${host} ${port} ${status}`);
        }
      })
    }

  }

  checkPort (port, host, callback) {
    let socket = new Socket()
    let status = null

    socket.on('connect', function () {
      status = 'open'
      socket.end()
    })

    socket.setTimeout(1500)

    socket.on('timeout', function () {
      status = 'closed'
      socket.destroy()
    })

    socket.on('error', function () {
      status = 'closed'
    })

    socket.on('close', function () {
      callback(null, status,host,port)
    })

    socket.connect(port, host)
  }
}

module.exports = Scan
