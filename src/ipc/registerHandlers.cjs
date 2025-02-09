// src/ipc/registerHandlers.cjs
const { ipcMain, app } = require('electron');
const { registerKeyboardShortcuts } = require('./keyboardShortcuts.cjs');
const { processImages } = require('./imageProcessing.cjs');

const registerHandlers = () => {
  // Keyboard shortcuts
  registerKeyboardShortcuts();

  // Image processing handler
  ipcMain.handle('process-images', async (_, filePaths) => {
    return processImages(filePaths);
  });

  // Other handlers
  ipcMain.on('quit-app', () => {
    app.quit();
  });
};

module.exports = { registerHandlers };