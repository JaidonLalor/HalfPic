// src/ipc/registerHandlers.cjs
const { ipcMain, app } = require('electron');
const { registerKeyboardShortcuts } = require('./keyboardShortcuts.cjs');

const registerHandlers = () => {
  // Keyboard shortcuts
  registerKeyboardShortcuts();

  // Other handlers
  ipcMain.on('quit-app', () => {
    app.quit();
  });
};

module.exports = { registerHandlers };