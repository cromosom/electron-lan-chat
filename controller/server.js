const ipc = require('electron').ipcMain
const express = require('express')
const server = express()
const http = require('http').Server(server)
const io = require('socket.io')(http)
const port = process.env.PORT || 8080
const chat = require('../view/ui-chat.js')

server.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

ipc.on('host-name-send', function (event, arg) {
  http.listen(port, function () {
    console.log('App listening on port ' + port)
  })

  event.sender.send('host-name-reply', `Server created and replys: ${arg}`)
})

io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    chat.send(data)
  });
})
