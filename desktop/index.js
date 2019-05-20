const { app, ipcMain: ipc } = require('electron');
const { createConnectionWindow } = require('./connectionWindow.js');
const { createOverlayWindow } = require('./overlayWindow.js');
const { WsClient } = require('./wsClient');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win, overlay
const wsClient = new WsClient('localhost');


ipc.on('connect-with-details', (event, message) => {
  // try to create connection
  wsClient.connect()
    .then((socket) => {
      // on success
      // create overlay
      overlay = createOverlayWindow();

      overlay.once('ready-to-show', () => {
        overlay.show()
      })

      overlay.on('closed', () => {
        overlay = null
      })

      app.dock.hide()
      overlay.maximize()
      overlay.setIgnoreMouseEvents(true)
      overlay.setAlwaysOnTop(true, 'floating')
      overlay.setVisibleOnAllWorkspaces(true)
      overlay.setFullScreenable(false)
      app.dock.show()

      // notify control screen of success
      event.reply('success')
    })
    .catch((error) => {
      event.reply('error', error.toString());
    });
});

ipc.on('disconnect', (event, message) => {
  wsClient.close();
  overlay.close();
  event.reply('disconnect');
});


function createWindow() {
  // Create the browser window.
  win = createConnectionWindow();

  win.once('ready-to-show', () => {
    win.show()
  })


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
