const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
    onMaximize: (callback) => ipcRenderer.on('window:maximized', callback),
    onUnmaximize: (callback) => ipcRenderer.on('window:unmaximized', callback),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
    updateDiscordRPC: (data) => ipcRenderer.send('update-discord-rpc', data),
    clearDiscordRPC: () => ipcRenderer.send('clear-discord-rpc')
});
