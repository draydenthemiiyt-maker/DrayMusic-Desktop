const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
    onMaximize: (callback) => ipcRenderer.on('window:maximized', callback),
    onUnmaximize: (callback) => ipcRenderer.on('window:unmaximized', callback),
    onMinimized: (callback) => ipcRenderer.on('window:minimized', callback),
    onRestored: (callback) => ipcRenderer.on('window:restored', callback),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
    setCloseToTray: (enabled) => ipcRenderer.send('window:set-close-to-tray', enabled),
    updatePlaybackState: (state) => ipcRenderer.send('window:playback-state', state),
    onTrayPrevious: (callback) => ipcRenderer.on('tray:previous', callback),
    onTrayPlayPause: (callback) => ipcRenderer.on('tray:play-pause', callback),
    onTrayNext: (callback) => ipcRenderer.on('tray:next', callback),
    updateDiscordRPC: (data) => ipcRenderer.send('update-discord-rpc', data),
    getThemes: () => ipcRenderer.invoke('themes:list'),
    openThemesFolder: () => ipcRenderer.invoke('themes:openFolder')
});
