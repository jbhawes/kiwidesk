const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const {ipcMain} = require('electron')

const jquery = require("jquery")

const b = require('bonescript')

ipcMain.on('press-button', (event, arg) => {
    console.log("yo: " + arg)  // prints "ping" 
    event.sender.send('asynchronous-reply', arg)
  });

  b.pinMode('P8_20', b.INPUT);

setInterval(copyInputToOutput, 100);
var buttonState = 0;  

function copyInputToOutput() {
    b.digitalRead('P8_20', writeToOutput);
    function writeToOutput(x) {
        console.log("Button Pushed: " + x.value);
        event.sender.send('asynchronous-reply', x.value)
    }
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow,
    loadingScreen,
    windowParams = {
        width: 1000,
        height: 700,
        show: false
    };

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  if (loadingScreen) {
        let loadingScreenBounds = loadingScreen.getBounds();
        mainWindow.setBounds(loadingScreenBounds);
        loadingScreen.close();
    }
}

function createLoadingScreen() {
    loadingScreen = new BrowserWindow(Object.assign(windowParams, {parent: mainWindow}));
    loadingScreen.loadURL('file://' + __dirname + '/splash.html');
    loadingScreen.on('closed', () => loadingScreen = null);
    loadingScreen.webContents.on('did-finish-load', () => {
        loadingScreen.show();
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createLoadingScreen();
    setTimeout(3000, createWindow());
  }

 
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
