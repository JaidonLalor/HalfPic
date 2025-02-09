// main.cjs
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { registerHandlers } = require('./src/ipc/registerHandlers.cjs');
const { unregisterKeyboardShortcuts } = require('./src/ipc/keyboardShortcuts.cjs');

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 400,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.cjs'),
      nodeIntegration: true,
      contextIsolation: true,
    }
  });

  const isDev = process.env.ELECTRON_IS_DEV === 'true';

  if (isDev) {
    console.log('Loading from localhost:3001 (Development)');
    win.loadURL('http://localhost:3001');
  } else {
    console.log('Loading from dist/index.html (Production)');
    win.loadFile('.webpack/renderer/main_window/index.html');
  }
}

app.whenReady().then(async () => {
  createWindow();
  registerHandlers();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  unregisterKeyboardShortcuts();

  if (process.env.ELECTRON_IS_DEV === 'true') {
    process.exit(0); // This will force all child processes to exit
  }
});