const $ = require('jquery')
const http = require('http')
const io = require('socket.io-client')

const chat = (function () {

  let socket = undefined;

  function init (ip) {
    socket = io('http://' + ip + ':8080' )

    socket.on('news', function (data) {
      console.log(data);
      test()
    });


  }

  function test () {
    socket.emit('my other event', { my: 'data' });
  }

  return {
    init : init
  }

})()

module.exports = chat
