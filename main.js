// © DraydenYT 2026

const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { pathToFileURL } = require('url');
const RPC = require('discord-rpc');
const gotTheLock = app.requestSingleInstanceLock();
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
        autoHideMenuBar: true,
        resizable: true,
        show: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
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
        if (isLegacyWin) {
            win.webContents.executeJavaScript(`document.documentElement.classList.add('legacy-platform');`).catch(() => {});
        }
        setTimeout(() => {
            try { win.show(); } catch (e) {}
        }, 500);
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
    ensureUserThemesDir();
    createWindow();
    initDiscordRPC();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});