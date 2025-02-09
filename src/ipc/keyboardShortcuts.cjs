// src/ipc/keyboardShortcuts.cjs
const { app, globalShortcut } = require('electron');

const registerKeyboardShortcuts = () => {
  globalShortcut.register('CommandOrControl+Q', () => {
    app.quit();
  });

  // Add more keyboard shortcuts here as needed
};

const unregisterKeyboardShortcuts = () => {
  globalShortcut.unregisterAll();
};

module.exports = {
  registerKeyboardShortcuts,
  unregisterKeyboardShortcuts
};