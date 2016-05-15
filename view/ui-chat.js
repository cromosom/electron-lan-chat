const $ = require('jquery')
const http = require('http')
const io = require('socket.io-client')

const chat = (function () {

  let socket = undefined
  let domStack = {}

  function init (ip) {
    socket = io('http://' + ip + ':8080' )

    cacheDom()
    bindEvents()

  }

  function cacheDom () {
    domStack.chatField = $('.chat')
    domStack.chatInput = $('#chat')
    domStack.chatSend = $('#send')
  }

  function bindEvents() {
    domStack.chatSend.on('click', sendMessage)

    // socket.on('news', function (data) {
    //   console.log(data);
    //   sendMessage()
    // });
  }

  function sendMessage () {
    let chatInputMsg = domStack.chatInput.val()

    console.log(chatInputMsg);
    socket.emit('my other event', { my: chatInputMsg });
  }

  function recive (msg) {
    domStack.chatField.append(msg)
  }

  return {
    init : init,
    send : recive
  }

})()

module.exports = chat
