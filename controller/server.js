const ipc = require('electron').ipcMain
const express = require('express')
const server = express()
const port = process.env.PORT || 8080

ipc.on('host-name-send', function (event, arg) {
  server.listen(port)
  console.log('App listening on port ' + port)

  event.sender.send('host-name-reply', `Server created and replys: ${arg}`)
})
