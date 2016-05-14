const $ = require('jquery')
const ipc = require('electron').ipcRenderer

ipc.on('host-name-reply', function (event, arg) {
  const message = `Message reply: ${arg}`
  console.log(message);
});

class HostUi {

  constructor() {
    const domStack = {}

    this.cacheDom()
    this.bindEvents()
  }

  cacheDom() {
    this.domStack = {
      hostBtn : $('#btn-host'),
      hostText : $('#host-text')
    }
  }

  bindEvents() {
    this.domStack.hostBtn.on('click', this.getText.bind(this) )
  }

  getText() {
    let val = this.domStack.hostText.val()
    ipc.send('host-name-send', val)
  }

}

module.exports = HostUi
