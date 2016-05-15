const $ = require('jquery')
const http = require('http')
const socket = require('socket.io')

const chat = (function () {

  function init (ip) {
    socket(ip)
  }

  return {
    init : init
  }

})()

module.exports = chat
