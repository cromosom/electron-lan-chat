const $ = require('jquery')
const ip = require('ip')
const net = require('net')
const Socket = net.Socket
const chat = require('./ui-chat.js')

class Scan {
  constructor() {
    const domStack = {}

    this.cacheDom()
    this.bindEvents()
  }

  cacheDom () {
    this.domStack = {
      scanBtn : $('#btn-scan'),
      resultContainer : $('.ip-results'),
      localIp : ip.address()
    }
  }

  bindEvents () {
    this.domStack.scanBtn.on('click', this.scanServers.bind(this) )
    $('body').on('click', '#btn-connect', this.connectServer.bind(this) )
    $('body').on('click', '[data-ip]', this.selectServer.bind(this) )
  }

  scanServers () {
    let subnet = this.domStack.localIp.split('.')
    let LAN = subnet[0] + '.' + subnet[1] + '.' + subnet[2]
    let PORT = '8080'

    for (let i = 1; i <= 255; i++) {
      this.checkPort(PORT, LAN + '.' + i, function (error, status, host, port) {
        if ( status == 'open' ) {
          let div = $('<div />', {
            'data-ip' : host,
            html : `Server found: ${host} ${port} ${status}`
          })

          this.domStack.resultContainer.append(div);
        }
      }.bind(this) )
    }

    this.domStack.resultContainer.after(
      $('<button />', {
        id : 'btn-connect',
        html : 'Connect'
      })
    )

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

  connectServer () {
    chat.init(this.domStack.selectedIp)
  }

  selectServer (e) {
    let self = $(e.target)
    let selectedIp = self.attr('data-ip')

    $('[data-ip]').css('color', '')
    self.css('color', 'green')

    this.domStack.selectedIp = selectedIp
  }

}

module.exports = Scan
