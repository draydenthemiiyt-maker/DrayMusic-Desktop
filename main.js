// © DraydenYT 2026

const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const RPC = require('discord-rpc');
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (BrowserWindow.getAllWindows().length > 0) {
            const win = BrowserWindow.getAllWindows()[0];
            if (win.isMinimized()) win.restore();
            win.focus();
        }
    });
}

const clientId = '1534336322481819648';
let rpcClient = null;
let rpcReady = false;
let latestDiscordActivity = {
    details: 'Browsing library',
    largeImageKey: 'logo',
    largeImageText: 'DrayMusic',
    instance: false
};
let discordActivityRevision = 0;
let discordActivityUpdateInFlight = false;

function applyLatestDiscordActivity() {
    if (!rpcReady || !rpcClient || discordActivityUpdateInFlight) return;

    const revision = discordActivityRevision;
    const activity = latestDiscordActivity;
    discordActivityUpdateInFlight = true;

    Promise.resolve(rpcClient.setActivity(activity))
        .catch(console.error)
        .then(() => {
            discordActivityUpdateInFlight = false;
            if (revision !== discordActivityRevision) applyLatestDiscordActivity();
        });
}

function queueDiscordActivity(activity) {
    latestDiscordActivity = activity;
    discordActivityRevision++;
    applyLatestDiscordActivity();
}

function buildDiscordActivity(data) {
    return {
        details: data.title || 'Browsing library',
        state: data.artist ? `by ${data.artist}` : undefined,
        largeImageKey: data.art || 'logo',
        largeImageText: data.title || 'DrayMusic',
        smallImageKey: data.playing ? 'play' : 'pause',
        smallImageText: data.playing ? 'Playing' : 'Paused',
        type: 2,
        buttons: [
            {
                label: 'Discover DrayMusic',
                url: 'https://discord.gg/dHqFDVZBQg'
            }
        ],
        instance: false
    };
}

function initDiscordRPC() {
    RPC.register(clientId);
    rpcClient = new RPC.Client({ transport: 'ipc' });

    rpcClient.on('ready', () => {
        rpcReady = true;
        applyLatestDiscordActivity();
    });

    rpcClient.on('disconnected', () => {
        rpcReady = false;
    });

    rpcClient.login({ clientId }).catch(console.error);
}

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 632,
        minHeight: 123,
        frame: false,
        autoHideMenuBar: true,
        resizable: true,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            webviewTag: true
        }
    });

    win.loadFile('app/main.html');

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    ipcMain.on('window:minimize', () => win.minimize());
    ipcMain.on('window:maximize', () => {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    });
    ipcMain.on('window:close', () => win.close());
    ipcMain.handle('window:isMaximized', () => win.isMaximized());

    win.on('maximize', () => win.webContents.send('window:maximized'));
    win.on('unmaximize', () => win.webContents.send('window:unmaximized'));
    
    win.webContents.on('did-finish-load', () => {
        try { win.show(); } catch (e) {}
    });
}

ipcMain.on('update-discord-rpc', (event, data) => {
    queueDiscordActivity(buildDiscordActivity(data));
});

ipcMain.on('clear-discord-rpc', () => {
    queueDiscordActivity({
        details: 'Idle',
        largeImageKey: 'logo',
        largeImageText: 'DrayMusic BETA'
    });
});

app.whenReady().then(() => {
    createWindow();
    initDiscordRPC();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});