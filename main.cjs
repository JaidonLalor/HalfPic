// main.cjs
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { registerHandlers } = require('./src/ipc/registerHandlers.cjs');

function createWindow() {
  const preloadPath = app.isPackaged
    ? path.join(__dirname, 'preload.js')
    : path.join(__dirname, 'preload.js');

  const mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath
    }
  });

  // Enable file drops - IDK what this does
  mainWindow.webContents.on('will-navigate', (e) => {
    e.preventDefault();
  });

  // File selection handler
  ipcMain.handle('select-files', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }
      ]
    });
    
    if (!result.canceled) {
      return result.filePaths;
    }
    return [];
  });

  // Load the correct URL
  if (process.env.ELECTRON_IS_DEV) {
    mainWindow.loadURL('http://localhost:3001');  // Make sure this port matches your webpack dev server
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  registerHandlers();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});