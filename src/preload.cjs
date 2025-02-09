// preload.cjs
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // insertRecord: (table, data) => ipcRenderer.invoke('db:insert', table, data),
    // query: (sql, params) => ipcRenderer.invoke('db:query', sql, params),
    // updateRecord: (table, data, where) => ipcRenderer.invoke('db:update', table, data, where),
    // deleteRecord: (table, where) => ipcRenderer.invoke('db:delete', table, where),
    // quit: () => ipcRenderer.send('quit-app'),
    // fetchPresets: () => ipcRenderer.invoke('db:fetch-presets'),
    // savePresets: (presets) => ipcRenderer.invoke('db:save-presets', presets),
});