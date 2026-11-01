// © DraydenYT 2026

const { app, BrowserWindow, ipcMain, Menu, nativeImage, shell, Tray, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { pathToFileURL } = require('url');
const RPC = require('discord-rpc');
const gotTheLock = app.requestSingleInstanceLock();
let tray = null;
let isQuitting = false;
let closeToTray = true;
let windowClosedToTray = false;
let playbackState = { isPlaying: false, hasSong: false, title: '' };
const isLegacyWin = (() => {
    if (process.platform !== 'win32') return false;
    const release = os.release();
    const parts = release.split('.').map(Number);
    return parts[0] < 10;
})();

if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (BrowserWindow.getAllWindows().length > 0) {
            showWindow();
        }
    });
}

const clientId = '1534336322481819648';
let rpcClient = null;
let rpcReady = false;
let latestDiscordActivity = null;
let discordActivityUpdateInFlight = false;
let discordActivityUpdatePending = false;

function applyLatestDiscordActivity() {
    if (!rpcReady || !rpcClient || !latestDiscordActivity) return;
    if (discordActivityUpdateInFlight) {
        discordActivityUpdatePending = true;
        return;
    }

    const client = rpcClient;
    const activity = latestDiscordActivity;
    discordActivityUpdateInFlight = true;

    Promise.resolve()
        .then(() => client.setActivity(activity))
        .catch(console.error)
        .finally(() => {
            discordActivityUpdateInFlight = false;
            if (discordActivityUpdatePending) {
                discordActivityUpdatePending = false;
                applyLatestDiscordActivity();
            }
        });
}

function buildDiscordActivity(data) {
    return {
        details: data.title,
        state: data.artist ? `by ${data.artist}` : undefined,
        largeImageKey: data.art || 'logo',
        largeImageText: data.title || 'DrayMusic',
        type: data.title === 'Browsing the library' ? 0 : 2,
        buttons: [
            {
                label: 'Discover DrayMusic',
                url: 'https://discord.gg/dHqFDVZBQg'
            }
        ],
        instance: false
    };
}

function updateDiscordActivity(data) {
    latestDiscordActivity = buildDiscordActivity(data);
    if (!rpcClient) connectDiscordRPC();
    applyLatestDiscordActivity();
}

function connectDiscordRPC() {
    RPC.register(clientId);
    const client = new RPC.Client({ transport: 'ipc' });
    rpcClient = client;

    client.on('ready', () => {
        if (rpcClient !== client) return;
        rpcReady = true;
        applyLatestDiscordActivity();
    });

    client.on('disconnected', () => {
        if (rpcClient !== client) return;
        rpcReady = false;
        rpcClient = null;
    });

    client.login({ clientId }).catch((error) => {
        console.error(error);
        if (rpcClient === client) {
            rpcReady = false;
            rpcClient = null;
        }
    });
}

const BUILTIN_THEMES_DIR = path.join(__dirname, 'app', 'themes');

function getUserThemesDir() {
    return path.join(app.getPath('documents'), 'DrayMusic Themes');
}

function ensureUserThemesDir() {
    const dir = getUserThemesDir();
    try {
        fs.mkdirSync(dir, { recursive: true });
    } catch (e) {
        console.error('Could not create the DrayMusic Themes folder:', e);
    }
    return dir;
}

function resolveInsideTheme(themeDir, relativePath) {
    if (typeof relativePath !== 'string' || !relativePath.trim()) return null;
    const fullPath = path.resolve(themeDir, relativePath);
    const relative = path.relative(themeDir, fullPath);
    if (!relative || relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) return null;
    return fullPath;
}

function cleanString(value, maxLength) {
    return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function readThemesFrom(rootDir, source) {
    const themes = [];
    let folders;
    try {
        folders = fs.readdirSync(rootDir);
    } catch (e) {
        return themes;
    }

    for (const folder of folders) {
        const themeDir = path.join(rootDir, folder);
        let config;
        try {
            if (!fs.statSync(themeDir).isDirectory()) continue;
            const raw = fs.readFileSync(path.join(themeDir, 'config.json'), 'utf8').replace(/^\uFEFF/, '');
            config = JSON.parse(raw);
        } catch (e) {
            continue;
        }
        if (!config || typeof config !== 'object') continue;

        const cssPath = resolveInsideTheme(themeDir, config.stylesheet);
        if (!cssPath || path.extname(cssPath).toLowerCase() !== '.css') continue;

        let cssStat;
        try {
            cssStat = fs.statSync(cssPath);
            if (!cssStat.isFile()) continue;
        } catch (e) {
            continue;
        }

        let css = '';
        if (cssStat.size <= 1024 * 1024) {
            try { css = fs.readFileSync(cssPath, 'utf8'); } catch (e) {}
        }

        let previewUrl = null;
        const previewPath = resolveInsideTheme(themeDir, config.preview);
        if (previewPath) {
            try {
                if (fs.statSync(previewPath).isFile()) previewUrl = pathToFileURL(previewPath).href;
            } catch (e) {}
        }

        themes.push({
            id: source + ':' + folder,
            source: source,
            folder: folder,
            name: cleanString(config.name, 60) || folder,
            author: cleanString(config.author, 60) || 'Unknown',
            version: cleanString(config.version, 20),
            description: cleanString(config.description, 200),
            order: Number.isFinite(config.order) ? config.order : 1000,
            href: pathToFileURL(cssPath).href + '?v=' + Math.round(cssStat.mtimeMs),
            preview: previewUrl,
            css: css
        });
    }

    return themes.sort((a, b) => (a.order - b.order) || a.name.localeCompare(b.name));
}

ipcMain.handle('themes:list', () => {
    const userDir = ensureUserThemesDir();
    return {
        userThemesDir: userDir,
        themes: readThemesFrom(BUILTIN_THEMES_DIR, 'builtin').concat(readThemesFrom(userDir, 'user'))
    };
});

ipcMain.handle('themes:openFolder', () => shell.openPath(ensureUserThemesDir()));

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 632,
        minHeight: 123,
        frame: isLegacyWin,
        resizable: true,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        }
    });

    win.webContents.setVisualZoomLevelLimits(1, 1).catch(console.error);
    win.once('ready-to-show', () => win.show());
    win.loadFile(path.join(__dirname, 'app', 'main.html'));
    win.webContents.on('before-input-event', (event, input) => {
        const controlOrCmd = input.control || input.meta;
        const key = input.key.toLowerCase();
        const isDevTools = input.key.toLowerCase() === 'i' && controlOrCmd && input.shift;
        const isCtrlR = key === 'r' && controlOrCmd;
        const isF5 = input.key === 'F5';
        const isZoomShortcut = controlOrCmd &&
            (key === '-' || key === '_' || key === '=' || key === '+' || key === '0' ||
                key === 'add' || key === 'subtract');

        if (isDevTools || isCtrlR || isF5 || isZoomShortcut) {
            event.preventDefault();
        }
    });

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    ipcMain.on('window:minimize', (event) => {
        if (event.sender === win.webContents) win.minimize();
    });
    ipcMain.on('window:maximize', () => {
        win.isMaximized() ? win.unmaximize() : win.maximize();
    });
    ipcMain.on('window:close', (event) => {
        if (event.sender === win.webContents) win.close();
    });
    ipcMain.on('window:set-close-to-tray', (event, enabled) => {
        if (event.sender === win.webContents && typeof enabled === 'boolean') closeToTray = enabled;
    });
    ipcMain.handle('window:isMaximized', () => win.isMaximized());

    win.on('minimize', () => win.webContents.send('window:minimized'));
    win.on('restore', () => win.webContents.send('window:restored'));
    win.on('show', () => win.webContents.send('window:restored'));
    win.on('close', (event) => {
        if (isQuitting) return;
        if (closeToTray && playbackState.isPlaying) {
            event.preventDefault();
            windowClosedToTray = true;
            win.hide();
            updateTray();
            return;
        }
        isQuitting = true;
        app.quit();
    });

    win.on('maximize', () => win.webContents.send('window:maximized'));
    win.on('unmaximize', () => win.webContents.send('window:unmaximized'));
    
    win.webContents.on('did-finish-load', () => {
        if (isLegacyWin) {
            win.webContents.executeJavaScript(`document.documentElement.classList.add('legacy-platform');`).catch(() => {});
        }
    });
}

function showWindow() {
    const win = BrowserWindow.getAllWindows()[0];
    if (!win) return;
    windowClosedToTray = false;
    if (win.isMinimized()) win.restore();
    else win.show();
    win.focus();
    updateTray();
}

function sendTrayCommand(channel) {
    const win = BrowserWindow.getAllWindows()[0];
    if (win && !win.isDestroyed()) win.webContents.send(channel);
}

function updateTray() {
    if (!playbackState.hasSong || !windowClosedToTray) {
        if (tray) {
            tray.destroy();
            tray = null;
        }
        return;
    }

    if (!tray) createTray();
    const status = playbackState.isPlaying ? 'Now playing' : 'Paused';
    tray.setToolTip(`${status}: ${playbackState.title || 'Unknown song'}`.slice(0, 127));
    tray.setContextMenu(Menu.buildFromTemplate([
        { label: 'Backward', click: () => sendTrayCommand('tray:previous') },
        {
            label: playbackState.isPlaying ? 'Pause' : 'Play',
            click: () => sendTrayCommand('tray:play-pause')
        },
        { label: 'Forward', click: () => sendTrayCommand('tray:next') },
        { label: 'Stop', click: quitApp },
        { type: 'separator' },
        { label: 'Open DrayMusic', click: showWindow }
    ]));
}

function createTray() {
    const iconPath = path.join(__dirname, 'app', 'assets', 'icon.png');
    const icon = nativeImage.createFromPath(iconPath);
    if (icon.isEmpty()) throw new Error(`Could not load tray icon: ${iconPath}`);

    tray = new Tray(icon);
    tray.on('click', showWindow);
    tray.on('double-click', showWindow);
}

function quitApp() {
    isQuitting = true;
    app.quit();
}

ipcMain.on('update-discord-rpc', (event, data) => {
    const win = BrowserWindow.getAllWindows()[0];
    if (!win || event.sender !== win.webContents || !data || typeof data.title !== 'string' || !data.title.trim()) return;
    updateDiscordActivity(data);
});

ipcMain.on('window:playback-state', (event, state) => {
    const win = BrowserWindow.getAllWindows()[0];
    if (!win || event.sender !== win.webContents || !state || typeof state.isPlaying !== 'boolean') return;

    playbackState = {
        isPlaying: state.isPlaying,
        hasSong: state.hasSong === true,
        title: typeof state.title === 'string' ? state.title.trim().slice(0, 100) : ''
    };
    if (windowClosedToTray && !playbackState.isPlaying) {
        if (!playbackState.hasSong) {
            quitApp();
            return;
        }
    }
    updateTray();
});

app.whenReady().then(() => {
    ensureUserThemesDir();
    createWindow();
});

app.on('will-quit', () => {
    if (tray) tray.destroy();
    globalShortcut.unregisterAll();
});

app.on('before-quit', () => {
    isQuitting = true;
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
