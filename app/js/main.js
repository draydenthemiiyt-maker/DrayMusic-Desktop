// © DraydenYT 2026

var isElectronApp = Boolean(window.api && window.api.platform);
var systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

window.addEventListener('wheel', function (event) {
    if (event.ctrlKey) event.preventDefault();
}, { capture: true, passive: false });

function getColorModePreference() {
    if (!isElectronApp) return 'system';
    try {
        var mode = localStorage.getItem('drayColorMode');
        return mode === 'light' || mode === 'dark' ? mode : 'system';
    } catch (e) {
        return 'system';
    }
}

function formatTrackTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) seconds = 0;
    seconds = Math.floor(seconds);
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;
    if (hours > 0) {
        return hours + ':' + String(minutes).padStart(2, '0') + ':' + String(remainingSeconds).padStart(2, '0');
    }
    return minutes + ':' + String(remainingSeconds).padStart(2, '0');
}

function updateTrackTimeLabels(currentTime, duration) {
    var current = formatTrackTime(currentTime);
    var total = formatTrackTime(duration);
    if (DOM.currentTimeLabel) DOM.currentTimeLabel.textContent = current;
    if (DOM.totalTimeLabel) DOM.totalTimeLabel.textContent = total;
    if (DOM.currentTimeNowPlayingLabel) DOM.currentTimeNowPlayingLabel.textContent = current;
    if (DOM.totalTimeNowPlayingLabel) DOM.totalTimeNowPlayingLabel.textContent = total;
}

function updateSystemThemeClass(event) {
    var mode = getColorModePreference();
    var isDark = mode === 'system' ? event.matches : mode === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
}

updateSystemThemeClass(systemThemeQuery);
if (systemThemeQuery.addEventListener) {
    systemThemeQuery.addEventListener('change', updateSystemThemeClass);
} else if (systemThemeQuery.addListener) {
    systemThemeQuery.addListener(updateSystemThemeClass);
}

var DOM = {
    audio: document.getElementById('audioElement'),
    songList: document.getElementById('songList'),
    searchInput: document.getElementById('searchInput'),
    seekBar: document.getElementById('seekBar'),
    btnPlayPause: document.getElementById('btnPlayPause'),
    btnNext: document.getElementById('btnNext'),
    btnPrev: document.getElementById('btnPrev'),
    btnLoop: document.getElementById('btnLoop'),
    currentTitle: document.getElementById('currentTitle'),
    currentArtist: document.getElementById('currentArtist'),
    currentArt: document.getElementById('currentArt'),
    speedSlider: document.getElementById('speedSlider'),
    speedLabel: document.getElementById('speedLabel'),
    preservePitch: document.getElementById('preservePitch'),
    drySlider: document.getElementById('drySlider'),
    wetSlider: document.getElementById('wetSlider'),
    favoritesContainer: document.getElementById('favoritesContainer'),
    playlistsContainer: document.getElementById('playlistsContainer'),
    pageContainer: document.getElementById('pageContainer'),
    appLayout: document.querySelector('.app-layout'),
    sidebarToggle: document.getElementById('sidebarToggle'),
    sidebarPlaylistList: document.getElementById('sidebarPlaylistList'),
    contextMenu: document.getElementById('contextMenu'),
    renamePlaylistMenu: document.getElementById('renamePlaylistMenu'),
    renamePlaylistInput: document.getElementById('renamePlaylistInput'),
    createPlaylistMenu: document.getElementById('createPlaylistMenu'),
    createPlaylistMenuInput: document.getElementById('createPlaylistMenuInput'),
    contextSongOptions: document.getElementById('contextSongOptions'),
    contextPlaylistOptions: document.getElementById('contextPlaylistOptions'),
    contextPlaylistSongOptions: document.getElementById('contextPlaylistSongOptions'),
    contextPlaylistItems: document.getElementById('contextPlaylistItems'),
    btnCreatePlaylist: document.getElementById('btnCreatePlaylist'),
    audioEffectsHeading: document.getElementById('audioEffectsHeading'),
    newPlaylistInput: document.getElementById('newPlaylistInput'),
    btnRenamePlaylist: document.getElementById('btnRenamePlaylist'),
    btnDeletePlaylist: document.getElementById('btnDeletePlaylist'),
    btnCancelRenamePlaylist: document.getElementById('btnCancelRenamePlaylist'),
    btnConfirmRenamePlaylist: document.getElementById('btnConfirmRenamePlaylist'),
    btnCancelCreatePlaylist: document.getElementById('btnCancelCreatePlaylist'),
    btnConfirmCreatePlaylist: document.getElementById('btnConfirmCreatePlaylist'),
    btnRemoveSongFromPlaylist: document.getElementById('btnRemoveSongFromPlaylist'),
    btnFavorite: document.getElementById('btnFavorite'),
    btnAddToPlaylist: document.getElementById('btnAddToPlaylist'),
    btnDownloadSong: document.getElementById('btnDownloadSong'),
    shareWithTimestamp: document.getElementById('shareWithTimestamp'),
    shareTimestampField: document.getElementById('shareTimestampField'),
    shareTimestampInput: document.getElementById('shareTimestampInput'),
    btnShareSong: document.getElementById('btnShareSong'),
    btnPlayInDesktop: document.getElementById('btnPlayInDesktop'),
    shareNotification: document.getElementById('shareNotification'),
    contextDesktopLaunchOptions: document.getElementById('contextDesktopLaunchOptions'),
    btnCloseDesktopLaunchNotice: document.getElementById('btnCloseDesktopLaunchNotice'),
    btnStop: document.getElementById('btnStop'),
    masterVolumeSlider: document.getElementById('masterVolumeSlider'),
    btnVolume: document.getElementById('btnVolume'),
    masterVolumePercent: document.getElementById('masterVolumePercent'),
    currentTimeLabel: document.getElementById('currentTimeLabel'),
    totalTimeLabel: document.getElementById('totalTimeLabel'),
    currentTimeNowPlayingLabel: document.getElementById('currentTimeNowPlayingLabel'),
    totalTimeNowPlayingLabel: document.getElementById('totalTimeNowPlayingLabel'),
    contextPlayerOptions: document.getElementById('contextPlayerOptions'),
    menuBtnLoop: document.getElementById('menuBtnLoop'),
    menuBtnEQ: document.getElementById('menuBtnEQ'),
    menuBtnStop: document.getElementById('menuBtnStop'),
    menuBtnFavorite: document.getElementById('menuBtnFavorite'),
    openNowPlaying: document.getElementById('openNowPlaying'),
    nowplayingPane: document.getElementById('nowplayingPane'),
    btnCloseNowPlaying: document.getElementById('btnCloseNowPlaying'),
    nowplayingArt: document.getElementById('nowplayingArt'),
    nowplayingTitle: document.getElementById('nowplayingTitle'),
    nowplayingArtist: document.getElementById('nowplayingArtist'),
    btnPrevNowPlaying: document.getElementById('btnPrevNowPlaying'),
    btnPlayPauseNowPlaying: document.getElementById('btnPlayPauseNowPlaying'),
    btnNextNowPlaying: document.getElementById('btnNextNowPlaying'),
    seekBarNowPlaying: document.getElementById('seekBarNowPlaying'),
    stereoWidthSlider: document.getElementById('stereoWidthSlider'),
    centerGainSlider: document.getElementById('centerGainSlider'),
    echoTimeSlider: document.getElementById('echoTimeSlider'),
    echoFeedbackSlider: document.getElementById('echoFeedbackSlider'),
    echoMixSlider: document.getElementById('echoMixSlider'),
    lyricsPane: document.getElementById('lyricsPane'),
    lyricsFab: document.getElementById('lyricsFab'),
    btnCloseLyrics: document.getElementById('btnCloseLyrics'),
    lyricsBody: document.getElementById('lyricsBody'),
    lyricsText: document.getElementById('lyricsText'),
    lyricsSong: document.getElementById('lyricsSong'),
    nowplayingArtBackground: document.getElementById('nowplayingArtBackground'),
    colorModeSelect: document.getElementById('colorModeSelect'),
    closeToTrayToggle: document.getElementById('closeToTrayToggle')
};

if (DOM.colorModeSelect) DOM.colorModeSelect.value = getColorModePreference();
if (DOM.closeToTrayToggle) {
    try {
        DOM.closeToTrayToggle.checked = localStorage.getItem('drayCloseToTray') !== 'false';
    } catch (e) {
        DOM.closeToTrayToggle.checked = true;
    }
    if (window.api && window.api.setCloseToTray) {
        window.api.setCloseToTray(DOM.closeToTrayToggle.checked);
    }
}

window.audio = DOM.audio;

var allSongs = [];
var currentPlaylist = [];
var currentIndex = -1;
var pendingProtocolSongTitle = null;
var lastDiscordSongUrl = null;
var playbackRequested = false;
var isLooping = false;
var pendingSeekPercent = null;
var pendingSharedSongTimestamp = null;
var mediaSessionHandlersRegistered = false;
var trackSourceChanging = false;
var trackSourceChangeId = 0;
var artworkRequestId = 0;
var nextAudioPreloader = null;
var nextAudioPreloadUrl = '';
var nextArtworkPreloader = null;
var nextArtworkPreloadUrl = '';
var activeTargetSong = null;
var activeTargetPlaylist = null;
var desktopLaunchMenuTimeout = null;
var currentPage = 0;
var pageTransitionTimeout = null;
var favoriteUrls = JSON.parse(localStorage.getItem('drayFavorites') || '[]');
var userPlaylists = isElectronApp ? JSON.parse(localStorage.getItem('drayPlaylists') || '{}') : {};
var playlistOrder = [];
if (isElectronApp) {
    try {
        var savedPlaylistOrder = JSON.parse(localStorage.getItem('drayPlaylistOrder') || '[]');
        if (Array.isArray(savedPlaylistOrder)) {
            playlistOrder = savedPlaylistOrder.filter(function (name) { return typeof name === 'string'; });
        }
    } catch (error) {
        console.error('Could not load playlist order:', error);
    }
}
var audioCtx = null;
var filters = [];
var reverbNode, dryGain, wetGain;
var splitterNode, mergerNode;
var midGainNode, sideGainNode;
var echoDelayNode, echoFeedbackNode, echoWetGainNode;
var analyser = null;
var offlineDB = null;
var lyricsAvailable = false;
var lyricsCollapsed = localStorage.getItem('drayLyricsCollapsed') === 'true';
var lyricsRequestId = 0;
var lyricsCache = {};
var lastMasterVolume = 1;
var isAudioMuted = false;
var isSpaceSpeedBoostActive = false;
var spacePressTimer = null;
var isSpaceKeyDown = false;
var spacePressBecameHold = false;

            var maxBtn = document.getElementById('max-btn');
            var windowApi = window.api;
            try {
                var savedVolumeValue = localStorage.getItem('drayMasterVolume');
                if (savedVolumeValue !== null && savedVolumeValue.trim() !== '') {
                    var savedVolume = Number(savedVolumeValue);
                    if (Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1) {
                        lastMasterVolume = savedVolume;
                    }
                }
                isAudioMuted = localStorage.getItem('drayAudioMuted') === 'true';
            } catch (e) {}
            if (DOM.audio) {
                DOM.audio.volume = lastMasterVolume;
                DOM.audio.muted = isAudioMuted;
            }
            if (DOM.masterVolumeSlider) DOM.masterVolumeSlider.value = String(lastMasterVolume);
            updateMasterVolumePercent();
            updateVolumeButton();
            updateTrayPlaybackState(!!(DOM.audio && !DOM.audio.paused));
            if (windowApi && windowApi.onMinimized) {
                windowApi.onMinimized(function () {
                    document.body.classList.add('performance-minimized');
                });
            }
            if (windowApi && windowApi.onRestored) {
                windowApi.onRestored(function () {
                    document.body.classList.remove('performance-minimized');
                });
            }
            document.getElementById('min-btn').onclick = () => windowApi && windowApi.minimize();
            document.getElementById('max-btn').onclick = () => windowApi && windowApi.maximize();
            document.getElementById('close-btn').onclick = () => windowApi && windowApi.close();

            if (windowApi && windowApi.onMaximize) {
                windowApi.onMaximize(() => {
                    maxBtn.innerHTML = '&#xE923;';
                });
            }

            if (windowApi && windowApi.onUnmaximize) {
                windowApi.onUnmaximize(() => {
                    maxBtn.innerHTML = '&#xE922;';
                });
            }

window.addEventListener('online', function () {
    loadMusic();
});

window.addEventListener('offline', function () {
    loadOfflineSongs(function (songs) {
        allSongs = songs;
        currentPlaylist = allSongs.slice(0);
        renderList(currentPlaylist);
        renderPlaylists();
        restoreLastPlayedSong();
    });
});

function openOfflineDB(callback) {
    if (!('indexedDB' in window)) return;
    var req = window.indexedDB.open('DrayMusicOffline', 1);

    req.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('songs')) {
            var store = db.createObjectStore('songs', { keyPath: 'url' });
            store.createIndex('favorite', 'favorite', { unique: false });
            store.createIndex('playlists', 'playlists', { unique: false });
        }
    };

    req.onsuccess = function (e) {
        offlineDB = e.target.result;
        if (callback) callback();
    };

    req.onerror = function () { console.log('DB error'); };
}

function syncSongOffline(songUrl) {
    if (!offlineDB || !songUrl) return;

    var song = null;
    for (var i = 0; i < allSongs.length; i++) {
        if (allSongs[i].url === songUrl) {
            song = allSongs[i];
            break;
        }
    }
    if (!song) {
        for (var i = 0; i < currentPlaylist.length; i++) {
            if (currentPlaylist[i].url === songUrl) {
                song = currentPlaylist[i];
                break;
            }
        }
    }

    var isFav = favoriteUrls.indexOf(songUrl) !== -1;
    var containingPlaylists = [];
    var playlistNames = getOrderedPlaylistNames();
    for (var i = 0; i < playlistNames.length; i++) {
        var pName = playlistNames[i];
        if (userPlaylists[pName] && userPlaylists[pName].indexOf(songUrl) !== -1) {
            containingPlaylists.push(pName);
        }
    }

    var isNeeded = isFav || containingPlaylists.length > 0;

    var tx = offlineDB.transaction(['songs'], 'readwrite');
    var store = tx.objectStore('songs');
    var req = store.get(songUrl);

    req.onsuccess = function (e) {
        var record = e.target.result;

        if (!isNeeded) {
            if (record) {
                var delTx = offlineDB.transaction(['songs'], 'readwrite');
                delTx.objectStore('songs')['delete'](songUrl);
                console.log('Removed from offline cache:', songUrl);

                if (!navigator.onLine) {
                    allSongs = allSongs.filter(function (s) { return s.url !== songUrl; });
                    currentPlaylist = currentPlaylist.filter(function (s) { return s.url !== songUrl; });
                    renderList(currentPlaylist);
                    if (currentPage === 1) renderFavorites();
                    var activePlaylistPage = getActivePlaylistPage();
                    if (currentPage === 2 || activePlaylistPage) {
                        renderPlaylists();
                        if (activePlaylistPage) renderPlaylistDetail(activePlaylistPage.getAttribute('data-playlist'));
                    }
                }
            }
            return;
        }

        if (record) {
            record.favorite = isFav;
            record.playlists = containingPlaylists;
            if (song) {
                record.title = song.title;
                record.artist = song.artist;
                record.art = song.art;
                record.copyrighted = song.copyrighted;
                record.lyrics = song.lyrics || '';
            }
            var updateTx = offlineDB.transaction(['songs'], 'readwrite');
            updateTx.objectStore('songs').put(record);
            console.log('Updated offline flags for:', songUrl);
        } else {
            if (song && navigator.onLine) {
                fetch(songUrl).then(function (res) {
                    return res.blob();
                }).then(function (blob) {
                    var newRecord = {
                        url: songUrl,
                        title: song.title,
                        artist: song.artist,
                        art: song.art,
                        copyrighted: song.copyrighted,
                        lyrics: song.lyrics || '',
                        favorite: isFav,
                        playlists: containingPlaylists,
                        blob: blob
                    };
                    var insertTx = offlineDB.transaction(['songs'], 'readwrite');
                    insertTx.objectStore('songs').put(newRecord);
                    console.log('Cached new song offline:', songUrl);
                })['catch'](function (err) {
                    console.error('Offline cache download failed', err);
                });
            }
        }
    };
}

function isWidgetApp() {
    return document.body.className.indexOf('widgetapp') !== -1;
}

function escapeHTML(str) {
    return String(str || '').replace(/[&"<>\']/g, function (m) {
        return ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;', "'": '&#39;' })[m];
    });
}

function clampPercent(p) {
    return Math.max(0, Math.min(100, Number(p) || 0));
}

function updateRangeFill(range) {
    if (!range) return;
    var min = Number(range.min) || 0;
    var max = Number(range.max);
    var value = Number(range.value);
    var progress = max > min && Number.isFinite(value)
        ? clampPercent(((value - min) / (max - min)) * 100)
        : 0;
    range.style.setProperty('--range-progress', progress + '%');
}

function updateAllRangeFills() {
    var sliders = document.querySelectorAll('input[type="range"]');
    for (var i = 0; i < sliders.length; i++) updateRangeFill(sliders[i]);
}

function saveFavorites() {
    localStorage.setItem('drayFavorites', JSON.stringify(favoriteUrls));
}

function savePlaylists() {
    if (!isElectronApp) return;
    localStorage.setItem('drayPlaylists', JSON.stringify(userPlaylists));
    savePlaylistOrder();
}

function getOrderedPlaylistNames() {
    var currentNames = Object.keys(userPlaylists);
    var orderedNames = playlistOrder.filter(function (name, index) {
        return currentNames.indexOf(name) !== -1 && playlistOrder.indexOf(name) === index;
    });
    var unlistedNames = currentNames.filter(function (name) {
        return orderedNames.indexOf(name) === -1;
    });
    unlistedNames.sort(compareAlphabetically);
    playlistOrder = orderedNames.concat(unlistedNames);
    return playlistOrder.slice();
}

function savePlaylistOrder() {
    playlistOrder = getOrderedPlaylistNames();
    localStorage.setItem('drayPlaylistOrder', JSON.stringify(playlistOrder));
}

function savePlaylistOrderFromContainer(container, selector) {
    var renderedItems = container.querySelectorAll(selector);
    var renderedOrder = [];
    for (var i = 0; i < renderedItems.length; i++) {
        renderedOrder.push(renderedItems[i].getAttribute('data-name'));
    }

    var currentOrder = getOrderedPlaylistNames();
    if (renderedOrder.length !== currentOrder.length ||
        currentOrder.some(function (name) { return renderedOrder.indexOf(name) === -1; })) return;

    playlistOrder = renderedOrder;
    savePlaylistOrder();
    renderPlaylists();
}

function bindPlaylistDragAndDrop(container, selector, direction) {
    if (container.dataset.playlistDragBound === 'true') return;
    container.dataset.playlistDragBound = 'true';

    var dragState = null;
    var suppressClick = false;
    var clickResetTimer = null;
    var shiftAnimations = new WeakMap();
    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function captureShiftPositions(excludedItem) {
        if (prefersReducedMotion) return [];
        var items = container.querySelectorAll(selector);
        var positions = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item === excludedItem) continue;
            var animation = shiftAnimations.get(item);
            if (animation && animation.playState !== 'finished') animation.cancel();
            var rect = item.getBoundingClientRect();
            positions.push({ item: item, left: rect.left, top: rect.top });
        }
        return positions;
    }

    function animateShift(positions) {
        for (var i = 0; i < positions.length; i++) {
            var position = positions[i];
            if (!position.item.isConnected || typeof position.item.animate !== 'function') continue;
            var rect = position.item.getBoundingClientRect();
            var deltaX = position.left - rect.left;
            var deltaY = position.top - rect.top;
            if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) continue;
            var animation = position.item.animate([
                { transform: 'translate(' + deltaX + 'px, ' + deltaY + 'px)' },
                { transform: 'translate(0, 0)' }
            ], { duration: 160, easing: 'ease-out' });
            shiftAnimations.set(position.item, animation);
        }
    }

    function clearDragState() {
        if (!dragState) return;
        dragState.sourceItem.classList.remove('playlist-dragging');
        if (dragState.targetItem) dragState.targetItem.classList.remove('playlist-drop-target');
        if (dragState.sourceItem.hasPointerCapture &&
            dragState.sourceItem.hasPointerCapture(dragState.pointerId)) {
            dragState.sourceItem.releasePointerCapture(dragState.pointerId);
        }
        dragState = null;
    }

    function finishDrag(event, shouldReorder) {
        if (!dragState || dragState.pointerId !== event.pointerId) return;
        var state = dragState;
        var wasDragging = state.dragging;
        var wasMoved = state.moved;
        clearDragState();
        if (wasDragging && shouldReorder) {
            suppressClick = true;
            clickResetTimer = setTimeout(function () {
                suppressClick = false;
                clickResetTimer = null;
            }, 0);
        }
        if (shouldReorder && wasMoved) savePlaylistOrderFromContainer(container, selector);
        else if (wasMoved) renderPlaylists();
    }

    function cancelDrag() {
        var wasMoved = dragState && dragState.moved;
        clearDragState();
        if (wasMoved) renderPlaylists();
    }

    container.addEventListener('pointerdown', function (event) {
        if (event.button !== 0) return;
        var item = event.target.closest ? event.target.closest(selector) : null;
        if (!item || !container.contains(item)) return;
        dragState = {
            sourceItem: item,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            dragging: false,
            targetItem: null,
            moved: false
        };
    });

    document.addEventListener('pointermove', function (event) {
        if (!dragState || dragState.pointerId !== event.pointerId) return;
        var deltaX = event.clientX - dragState.startX;
        var deltaY = event.clientY - dragState.startY;
        if (!dragState.dragging && Math.sqrt(deltaX * deltaX + deltaY * deltaY) < 6) return;

        if (!dragState.dragging) {
            dragState.dragging = true;
            dragState.sourceItem.classList.add('playlist-dragging');
            if (dragState.sourceItem.setPointerCapture) {
                dragState.sourceItem.setPointerCapture(event.pointerId);
            }
        }
        event.preventDefault();

        var target = document.elementFromPoint(event.clientX, event.clientY);
        var targetItem = target && target.closest ? target.closest(selector) : null;
        if (!targetItem || !container.contains(targetItem)) targetItem = null;
        if (dragState.targetItem && dragState.targetItem !== targetItem) {
            dragState.targetItem.classList.remove('playlist-drop-target');
        }
        dragState.targetItem = targetItem && targetItem !== dragState.sourceItem ? targetItem : null;
        if (dragState.targetItem) {
            var targetRect = dragState.targetItem.getBoundingClientRect();
            var afterTarget;
            if (direction === 'vertical') {
                afterTarget = event.clientY >= targetRect.top + targetRect.height / 2;
            } else {
                var sourceRect = dragState.sourceItem.getBoundingClientRect();
                var isSameRow = Math.abs(sourceRect.top - targetRect.top) < targetRect.height / 2;
                afterTarget = isSameRow
                    ? event.clientX >= targetRect.left + targetRect.width / 2
                    : event.clientY >= targetRect.top + targetRect.height / 2;
            }
            dragState.targetItem.classList.add('playlist-drop-target');
            if (afterTarget && dragState.targetItem.nextElementSibling !== dragState.sourceItem) {
                var positions = captureShiftPositions(dragState.sourceItem);
                container.insertBefore(dragState.sourceItem, dragState.targetItem.nextElementSibling);
                animateShift(positions);
                dragState.moved = true;
            } else if (!afterTarget && dragState.sourceItem.nextElementSibling !== dragState.targetItem) {
                var positions = captureShiftPositions(dragState.sourceItem);
                container.insertBefore(dragState.sourceItem, dragState.targetItem);
                animateShift(positions);
                dragState.moved = true;
            }
        }
    });

    document.addEventListener('pointerup', function (event) {
        finishDrag(event, true);
    });
    document.addEventListener('pointercancel', function (event) {
        finishDrag(event, false);
    });
    window.addEventListener('blur', cancelDrag);
    container.addEventListener('click', function (event) {
        if (!suppressClick) return;
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        if (clickResetTimer !== null) clearTimeout(clickResetTimer);
        clickResetTimer = null;
        suppressClick = false;
    }, true);
}

function getAudioSettingsControls() {
    return document.querySelectorAll('#equalizerPage input[type="range"], #equalizerPage input[type="checkbox"]');
}

function saveAudioSettings() {
    if (!isElectronApp) return;
    var settings = {};
    var controls = getAudioSettingsControls();
    for (var i = 0; i < controls.length; i++) {
        settings[controls[i].id] = controls[i].type === 'checkbox' ? controls[i].checked : controls[i].value;
    }
    localStorage.setItem('drayAudioSettings', JSON.stringify(settings));
}

function updateAudioSettingsLabels() {
    var labels = [
        ['speedLabel', function (value) { return Number(value).toFixed(2) + 'x'; }],
        ['stereoWidthLabel', function (value) { return Number(value).toFixed(2); }],
        ['centerGainLabel', function (value) { return Number(value).toFixed(2); }],
        ['echoTimeLabel', function (value) { return Number(value).toFixed(2) + 's'; }],
        ['echoFeedbackLabel', function (value) { return Number(value).toFixed(2); }],
        ['echoMixLabel', function (value) { return Number(value).toFixed(2); }]
    ];
    for (var i = 0; i < labels.length; i++) {
        var input = document.getElementById(labels[i][0].replace('Label', 'Slider'));
        var label = document.getElementById(labels[i][0]);
        if (input && label) label.textContent = labels[i][1](input.value);
    }
    updateSliderPercentages();
}

function updateSliderPercentages() {
    var sliders = document.querySelectorAll('#equalizerPage input[type="range"]');
    for (var i = 0; i < sliders.length; i++) {
        var slider = sliders[i];
        var percentLabel = document.getElementById(
            slider.id.indexOf('eqSlider') === 0
                ? 'eqPercent' + slider.id.slice('eqSlider'.length)
                : slider.id.replace(/Slider$/, 'Percent')
        );
        if (!percentLabel) continue;

        var min = Number(slider.min) || 0;
        var max = Number(slider.max);
        var range = max - min;
        var percent = range > 0 ? ((Number(slider.value) - min) / range) * 100 : 0;
        percentLabel.textContent = Math.round(Math.max(0, Math.min(100, percent))) + '%';
    }
}

function getAudioEffectControls() {
    return document.querySelectorAll(
        '#equalizerPage .eq-slider, #speedSlider, #preservePitch, #drySlider, #wetSlider, ' +
        '#stereoWidthSlider, #centerGainSlider, #echoTimeSlider, #echoFeedbackSlider, #echoMixSlider'
    );
}

function resetAudioEffects() {
    var controls = getAudioEffectControls();
    for (var i = 0; i < controls.length; i++) {
        if (controls[i].type === 'checkbox') controls[i].checked = controls[i].defaultChecked;
        else controls[i].value = controls[i].defaultValue;
    }
    updateAllRangeFills();
    updateAudioSettingsLabels();
    applyAudioSettingsToNodes();
    saveAudioSettings();
}

function restoreAudioSettings() {
    if (!isElectronApp) {
        updateAudioSettingsLabels();
        return;
    }
    var settings;
    try {
        settings = JSON.parse(localStorage.getItem('drayAudioSettings') || '{}');
    } catch (e) {
        settings = {};
    }
    var controls = getAudioSettingsControls();
    for (var i = 0; i < controls.length; i++) {
        if (!Object.prototype.hasOwnProperty.call(settings, controls[i].id)) continue;
        if (controls[i].type === 'checkbox') controls[i].checked = Boolean(settings[controls[i].id]);
        else controls[i].value = settings[controls[i].id];
    }
    updateAudioSettingsLabels();
}

function applyAudioSettingsToNodes() {
    updatePlayback();
    for (var i = 0; i < filters.length; i++) {
        var slider = document.getElementById('eqSlider' + i);
        if (slider) filters[i].gain.value = parseFloat(slider.value);
    }
    if (dryGain && DOM.drySlider) dryGain.gain.value = parseFloat(DOM.drySlider.value);
    if (wetGain && DOM.wetSlider) wetGain.gain.value = parseFloat(DOM.wetSlider.value);
    if (sideGainNode && DOM.stereoWidthSlider) sideGainNode.gain.value = parseFloat(DOM.stereoWidthSlider.value);
    if (midGainNode && DOM.centerGainSlider) midGainNode.gain.value = parseFloat(DOM.centerGainSlider.value);
    if (echoDelayNode && DOM.echoTimeSlider) echoDelayNode.delayTime.value = parseFloat(DOM.echoTimeSlider.value);
    if (echoFeedbackNode && DOM.echoFeedbackSlider) echoFeedbackNode.gain.value = parseFloat(DOM.echoFeedbackSlider.value);
    if (echoWetGainNode && DOM.echoMixSlider) echoWetGainNode.gain.value = parseFloat(DOM.echoMixSlider.value);
}

function restoreSidebarState() {
    if (!DOM.appLayout) return;
    var isSmallScreen = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
    var isCollapsed = isSmallScreen || localStorage.getItem('draySidebarCollapsed') === 'true';
    DOM.appLayout.classList.toggle('sidebar-collapsed', isCollapsed);
    if (DOM.sidebarToggle) {
        DOM.sidebarToggle.hidden = !!isSmallScreen;
        var label = isCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
        DOM.sidebarToggle.setAttribute('aria-label', label);
        DOM.sidebarToggle.title = label;
        var icon = DOM.sidebarToggle.querySelector('.material-symbols-rounded');
        if (icon) icon.textContent = isCollapsed ? 'left_panel_open' : 'left_panel_close';
    }
}

function restoreLastPlayedSong() {
    if (pendingProtocolSongTitle) {
        var protocolSongTitle = pendingProtocolSongTitle;
        pendingProtocolSongTitle = null;
        if (playSongByTitle(protocolSongTitle)) return;
    }

    if (playSongFromShareHash()) return;

    var lastUrl = localStorage.getItem('drayLastSongUrl');
    if (!lastUrl) return;
    for (var i = 0; i < currentPlaylist.length; i++) {
        if (currentPlaylist[i].url === lastUrl) {
            playSong(i, false);
            return;
        }
    }
}

function playSongByTitle(title) {
    var normalizedTitle = String(title || '').trim().toLocaleLowerCase();
    if (!normalizedTitle) return false;

    for (var i = 0; i < currentPlaylist.length; i++) {
        if (currentPlaylist[i].url && String(currentPlaylist[i].title || '').trim().toLocaleLowerCase() === normalizedTitle) {
            playSong(i);
            return true;
        }
    }
    return false;
}

if (window.api && window.api.onProtocolSong) {
    window.api.onProtocolSong(function (title) {
        pendingProtocolSongTitle = title;
        if (playSongByTitle(title)) pendingProtocolSongTitle = null;
    });
}

function safePlay(audioElement) {
    if (!audioElement) return;
    var playPromise = audioElement.play();
    if (playPromise !== undefined && typeof playPromise['catch'] === 'function') {
        playPromise['catch'](function (err) {
            console.warn('Playback failed or blocked by browser:', err);
        });
    }
}

function updatePlayPauseButtons() {
    var iconName = DOM.audio && !DOM.audio.paused ? 'pause' : 'play_arrow';
    var iconHTML = '<span class="material-symbols-rounded">' + iconName + '</span>';
    if (DOM.btnPlayPause) DOM.btnPlayPause.innerHTML = iconHTML;
    if (DOM.btnPlayPauseNowPlaying) DOM.btnPlayPauseNowPlaying.innerHTML = iconHTML;
}

function updateTrayPlaybackState(isPlaying) {
    if (!windowApi || !windowApi.updatePlaybackState) return;
    var song = currentPlaylist[currentIndex];
    windowApi.updatePlaybackState({
        isPlaying: isPlaying,
        hasSong: !!song,
        title: song && song.title ? song.title : ''
    });
}

function updateVolumeButton() {
    if (!DOM.btnVolume) return;
    var volumeControl = document.getElementById('volumeControl');
    if (volumeControl) volumeControl.classList.toggle('is-muted', isAudioMuted);
    var icon = isAudioMuted ? 'volume_off' :
        (lastMasterVolume < 0.5 ? 'volume_down' : 'volume_up');
    var iconElement = DOM.btnVolume.querySelector('.material-symbols-rounded');
    if (iconElement) iconElement.textContent = icon;
    DOM.btnVolume.setAttribute('aria-label', isAudioMuted ? 'Unmute' : 'Mute');
    DOM.btnVolume.title = isAudioMuted ? 'Unmute' : 'Mute';
}

function updateMasterVolumePercent() {
    if (DOM.masterVolumePercent) {
        DOM.masterVolumePercent.textContent = Math.round(lastMasterVolume * 100) + '%';
    }
}

function setAudioMuted(muted) {
    isAudioMuted = muted;
    if (DOM.audio) DOM.audio.muted = muted;
    try {
        localStorage.setItem('drayAudioMuted', String(muted));
    } catch (e) {}
    updateVolumeButton();
    updateTrayPlaybackState(!!(DOM.audio && !DOM.audio.paused));
}

function pauseAudio() {
    if (!DOM.audio) return;
    playbackRequested = false;
    trackSourceChanging = false;
    DOM.audio.pause();
    updateTrayPlaybackState(false);
}

function setPlayerControlsDisabled(disabled) {
    var controls = document.querySelectorAll(
        '.player-main button, .player-main input[type="range"], ' +
        '.player-right button, .player-right input[type="range"]'
    );
    for (var i = 0; i < controls.length; i++) controls[i].disabled = disabled;
    if (DOM.shareWithTimestamp) DOM.shareWithTimestamp.disabled = disabled;
    if (DOM.shareTimestampInput) {
        DOM.shareTimestampInput.disabled = disabled || !DOM.shareWithTimestamp.checked;
    }
}

function playSongFromShareHash() {
    var match = window.location.hash.match(/^#{1,2}song\+(.+?)(?:&t=(\d+(?:\.\d+)?))?$/i);
    if (!match) return false;

    var title;
    try {
        title = decodeURIComponent(match[1]);
    } catch (error) {
        console.error('Could not decode shared song link:', error);
        return false;
    }

    var timestamp = match[2] === undefined ? null : Number(match[2]);
    var normalizedTitle = title.trim().toLocaleLowerCase();
    for (var i = 0; i < currentPlaylist.length; i++) {
        if (currentPlaylist[i].url && String(currentPlaylist[i].title || '').trim().toLocaleLowerCase() === normalizedTitle) {
            playSong(i, undefined, timestamp);
            return true;
        }
    }
    return false;
}

function stopCurrentSong() {
    if (!DOM.audio) return;

    playbackRequested = false;
    trackSourceChanging = false;
    trackSourceChangeId++;
    DOM.audio.pause();
    if (Number.isFinite(DOM.audio.duration)) DOM.audio.currentTime = 0;
    currentIndex = -1;
    document.body.classList.add('no-song');
    setPlayerControlsDisabled(true);
    if (DOM.currentTitle) DOM.currentTitle.textContent = 'Not Playing';
    if (DOM.currentArtist) DOM.currentArtist.textContent = 'Select a song';
    if (DOM.nowplayingTitle) DOM.nowplayingTitle.textContent = 'Not Playing';
    if (DOM.nowplayingArtist) DOM.nowplayingArtist.textContent = 'Select a song';
    if (DOM.btnFavorite) DOM.btnFavorite.disabled = true;
    if (DOM.btnAddToPlaylist) DOM.btnAddToPlaylist.disabled = true;
    if (DOM.btnDownloadSong) DOM.btnDownloadSong.disabled = true;
    if (DOM.btnShareSong) DOM.btnShareSong.disabled = true;
    if (DOM.btnPlayInDesktop) DOM.btnPlayInDesktop.disabled = true;
    if (DOM.btnStop) DOM.btnStop.disabled = true;
    if (DOM.currentArt) DOM.currentArt.src = 'assets/icon.png';
    if (DOM.nowplayingArt) DOM.nowplayingArt.src = 'assets/icon.png';
    if (DOM.nowplayingArtBackground) DOM.nowplayingArtBackground.src = 'assets/icon.png';
    if (DOM.seekBar) {
        DOM.seekBar.value = 0;
        updateRangeFill(DOM.seekBar);
    }
    if (DOM.seekBarNowPlaying) {
        DOM.seekBarNowPlaying.max = 0;
        DOM.seekBarNowPlaying.value = 0;
        updateRangeFill(DOM.seekBarNowPlaying);
    }
    try {
        localStorage.removeItem('drayLastSongUrl');
    } catch (e) {}
    if (DOM.nowplayingPane && DOM.nowplayingPane.classList.contains('open')) {
        DOM.nowplayingPane.classList.remove('open');
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(console.error);
        }
    }
    updatePlayPauseButtons();
    updateTrackTimeLabels(0, 0);
    updateMediaSession(null);
    updateDiscordRPCForBrowsing();
    updateTrayPlaybackState(false);
}

function updateSeekUI(percent) {
    var p = clampPercent(percent);
    if (DOM.seekBar) {
        DOM.seekBar.value = p;
        updateRangeFill(DOM.seekBar);
    }
    if (DOM.progressFill) DOM.progressFill.style.width = p + '%';
}

function applySeekToAudio(percent) {
    if (!DOM.audio) return;
    var p = clampPercent(percent);

    if (!DOM.audio.duration || !isFinite(DOM.audio.duration)) {
        pendingSeekPercent = p;
        return;
    }

    var time = (p / 100) * DOM.audio.duration;

    if (typeof DOM.audio.fastSeek === 'function') {
        try { DOM.audio.fastSeek(time); }
        catch (e) { DOM.audio.currentTime = time; }
    } else {
        DOM.audio.currentTime = time;
    }
    pendingSeekPercent = null;
}

function seekBySeconds(seconds) {
    if (!DOM.audio || !Number.isFinite(DOM.audio.duration) || DOM.audio.duration <= 0) return;
    var currentTime = Number.isFinite(DOM.audio.currentTime) ? DOM.audio.currentTime : 0;
    seekToSeconds(currentTime + seconds);
}

function seekToSeconds(time) {
    if (!DOM.audio || !Number.isFinite(DOM.audio.duration) || DOM.audio.duration <= 0) return;
    DOM.audio.currentTime = Math.max(0, Math.min(DOM.audio.duration, time));
}

function seekToPercent(percent) {
    if (!DOM.audio) return;
    var p = clampPercent(percent);
    if (!DOM.audio.duration || !Number.isFinite(DOM.audio.duration)) {
        pendingSeekPercent = p;
        return;
    }
    seekToSeconds((p / 100) * DOM.audio.duration);
    pendingSeekPercent = null;
}

function isSpaceKey(key) {
    var normalizedKey = key.toLowerCase();
    return key === ' ' || normalizedKey === 'space' || normalizedKey === 'spacebar';
}

function setSpaceSpeedBoost(active) {
    if (isSpaceSpeedBoostActive === active) return;
    isSpaceSpeedBoostActive = active;
    updatePlayback();
}

function startSpacePress(event) {
    event.preventDefault();
    if (event.repeat || isSpaceKeyDown) return;
    isSpaceKeyDown = true;
    spacePressBecameHold = false;
    spacePressTimer = setTimeout(function () {
        spacePressTimer = null;
        if (!isSpaceKeyDown) return;
        spacePressBecameHold = true;
        setSpaceSpeedBoost(true);
    }, 200);
}

function finishSpacePress(togglePlayback) {
    if (!isSpaceKeyDown) return;
    if (spacePressTimer !== null) {
        clearTimeout(spacePressTimer);
        spacePressTimer = null;
    }
    var shouldTogglePlayback = togglePlayback && !spacePressBecameHold;
    isSpaceKeyDown = false;
    spacePressBecameHold = false;
    setSpaceSpeedBoost(false);
    if (shouldTogglePlayback && DOM.btnPlayPause) DOM.btnPlayPause.click();
}

function updateMediaSession(song) {
    if (!('mediaSession' in navigator)) return;

    var idle = !song;
    navigator.mediaSession.metadata = new MediaMetadata({
        title: idle ? 'DrayMusic' : (song.title || ''),
        artist: idle ? '' : (song.artist || ''),
        album: idle ? 'DrayMusic' : (song.album || 'DrayMusic'),
        artwork: [
            { src: idle ? 'assets/icon.png' : (song.art || 'assets/icon.png'), sizes: '512x512', type: 'image/png' }
        ]
    });

    if (!mediaSessionHandlersRegistered) {
        navigator.mediaSession.setActionHandler('play', function () {
            if (currentIndex < 0 || !currentPlaylist[currentIndex]) {
                if (!allSongs.length) return;
                currentPlaylist = allSongs.slice(0);
                playSong(0);
                return;
            }
            safePlay(DOM.audio);
        });
        navigator.mediaSession.setActionHandler('pause', function () {
            pauseAudio();
        });
        navigator.mediaSession.setActionHandler('stop', function () {
            if (!DOM.audio) return;
            pauseAudio();
            DOM.audio.currentTime = 0;
            updatePlayPauseButtons();
        });
        mediaSessionHandlersRegistered = true;
    }

    navigator.mediaSession.setActionHandler('previoustrack', idle ? null : function () {
        playSong(currentIndex - 1);
    });
    navigator.mediaSession.setActionHandler('nexttrack', idle ? null : function () {
        playSong(currentIndex + 1);
    });
    navigator.mediaSession.setActionHandler('seekto', idle ? null : function (details) {
        if (DOM.audio && Number.isFinite(details.seekTime)) DOM.audio.currentTime = details.seekTime;
    });
    navigator.mediaSession.setActionHandler('seekbackward', idle ? null : function (details) {
        if (DOM.audio) DOM.audio.currentTime = Math.max(0, DOM.audio.currentTime - (details.seekOffset || 10));
    });
    navigator.mediaSession.setActionHandler('seekforward', idle ? null : function (details) {
        if (DOM.audio && Number.isFinite(DOM.audio.duration)) {
            DOM.audio.currentTime = Math.min(DOM.audio.duration, DOM.audio.currentTime + (details.seekOffset || 10));
        }
    });
    if (idle) navigator.mediaSession.playbackState = 'paused';
}

function updateDownloadButton(song) {
    if (!DOM.btnDownloadSong) return;
    var canDownload = !!song && song.copyrighted === 'false';
    var tooltip = canDownload ? 'Save as' : "This song can't be downloaded";
    DOM.btnDownloadSong.disabled = !canDownload;
    DOM.btnDownloadSong.title = tooltip;
    DOM.btnDownloadSong.setAttribute('aria-label', tooltip);
}

var shareNotificationTimeout = null;

function showShareNotification(message) {
    if (!DOM.shareNotification) return;
    DOM.shareNotification.textContent = message;
    DOM.shareNotification.classList.add('show');
    clearTimeout(shareNotificationTimeout);
    shareNotificationTimeout = setTimeout(function () {
        DOM.shareNotification.classList.remove('show');
    }, 2800);
}

function copyTextFallback(text) {
    var input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    var copied;
    try {
        input.select();
        copied = document.execCommand('copy');
    } finally {
        input.parentNode.removeChild(input);
    }
    if (!copied) throw new Error('Clipboard copy was rejected');
}

function parseShareTimestamp(value) {
    var parts = String(value).trim().split(':');
    if (parts.length === 1) {
        if (!/^\d+(?:\.\d+)?$/.test(parts[0])) return null;
        var seconds = Number(parts[0]);
        return Number.isFinite(seconds) && seconds >= 0 ? Math.floor(seconds) : null;
    }

    if (parts.length > 3 || parts.some(function (part) { return !/^\d+$/.test(part); })) return null;
    var values = parts.map(Number);
    var last = values.length - 1;
    if (values[last] >= 60 || (values.length === 3 && values[1] >= 60)) return null;
    if (values.length === 2) return values[0] * 60 + values[1];
    return values[0] * 3600 + values[1] * 60 + values[2];
}

function shareCurrentSong() {
    var song = currentPlaylist[currentIndex];
    if (!song) return;

    var timestamp = null;
    if (DOM.shareWithTimestamp && DOM.shareWithTimestamp.checked) {
        timestamp = parseShareTimestamp(DOM.shareTimestampInput ? DOM.shareTimestampInput.value : '');
        if (timestamp === null) {
            showShareNotification('Enter a valid timestamp, such as 1:23');
            if (DOM.shareTimestampInput) DOM.shareTimestampInput.focus();
            return;
        }
    }

    var shareUrl = 'https://draydenthemiiyt-maker.github.io/draymusic.github.io/newWebdesktopExperience/main.html##song+' +
        encodeURIComponent(song.title || '');
    if (timestamp !== null) shareUrl += '&t=' + timestamp;
    var copyPromise;
    try {
        copyPromise = navigator.clipboard && navigator.clipboard.writeText
            ? navigator.clipboard.writeText(shareUrl)
            : Promise.reject(new Error('Clipboard API is unavailable'));
    } catch (error) {
        copyPromise = Promise.reject(error);
    }

    copyPromise.then(function () {
        showShareNotification('Copied to clipboard Share with friends!');
    }).catch(function (clipboardError) {
        try {
            copyTextFallback(shareUrl);
            showShareNotification('Copied to clipboard Share with friends!');
        } catch (fallbackError) {
            console.error('Could not copy share link:', clipboardError, fallbackError);
            showShareNotification('Could not copy share link');
        }
    });
}

function downloadCurrentSong() {
    if (!isElectronApp) return;
    var song = currentPlaylist[currentIndex];
    if (!song || song.copyrighted !== 'false' || !DOM.btnDownloadSong) return;

    DOM.btnDownloadSong.disabled = true;
    var sourceUrl = song.blobUrl || song.url;
    fetch(sourceUrl).then(function (response) {
        if (!response.ok) throw new Error('Download request failed: ' + response.status);
        return response.blob();
    }).then(function (blob) {
        var objectUrl = URL.createObjectURL(blob);
        var anchor = document.createElement('a');
        var filename = String(song.title || 'song').replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').trim();
        anchor.href = objectUrl;
        anchor.download = (filename || 'song') + '.mp3';
        document.body.appendChild(anchor);
        anchor.click();
        anchor.parentNode.removeChild(anchor);
        setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 1000);
    }).catch(function (error) {
        console.error('Song download failed:', error);
        alert('Unable to download this song.');
    }).then(function () {
        updateDownloadButton(currentPlaylist[currentIndex]);
    });
}

function updateTrackArtwork(song) {
    var requestId = ++artworkRequestId;
    var fallbackArt = 'assets/icon.png';
    var artworkElements = [
        DOM.currentArt,
        DOM.nowplayingArt,
        document.getElementById('nowplayingArtBackground')
    ].filter(Boolean);

    for (var i = 0; i < artworkElements.length; i++) {
        artworkElements[i].src = fallbackArt;
        if (artworkElements[i] === DOM.currentArt || artworkElements[i] === DOM.nowplayingArt) {
            artworkElements[i].classList.add('art-loading');
        }
    }

    var artUrl = song.art || fallbackArt;
    if (artUrl === 'placeholder.png' || artUrl === fallbackArt) {
        for (var j = 0; j < artworkElements.length; j++) artworkElements[j].classList.remove('art-loading');
        return;
    }

    var image = new Image();
    image.onload = function () {
        if (requestId !== artworkRequestId) return;
        for (var j = 0; j < artworkElements.length; j++) {
            artworkElements[j].src = artUrl;
            artworkElements[j].classList.remove('art-loading');
        }
    };
    image.onerror = function () {
        if (requestId !== artworkRequestId) return;
        for (var j = 0; j < artworkElements.length; j++) artworkElements[j].classList.remove('art-loading');
    };
    image.src = artUrl;
}

function preloadNextQueueItem() {
    var nextSong = currentPlaylist.length > 1 && currentIndex >= 0
        ? currentPlaylist[(currentIndex + 1) % currentPlaylist.length]
        : null;

    if (!nextSong) {
        if (nextAudioPreloader) {
            nextAudioPreloader.pause();
            nextAudioPreloader.removeAttribute('src');
            nextAudioPreloader.load();
            nextAudioPreloader = null;
        }
        nextAudioPreloadUrl = '';
        nextArtworkPreloader = null;
        nextArtworkPreloadUrl = '';
        return;
    }

    var audioUrl = nextSong.blobUrl || nextSong.url;
    if (audioUrl && audioUrl !== nextAudioPreloadUrl) {
        if (nextAudioPreloader) {
            nextAudioPreloader.pause();
            nextAudioPreloader.removeAttribute('src');
            nextAudioPreloader.load();
        }
        nextAudioPreloader = document.createElement('audio');
        nextAudioPreloader.preload = 'auto';
        nextAudioPreloader.src = audioUrl;
        nextAudioPreloader.load();
        nextAudioPreloadUrl = audioUrl;
    }

    if (nextSong.art && nextSong.art !== nextArtworkPreloadUrl) {
        nextArtworkPreloader = new Image();
        nextArtworkPreloader.src = nextSong.art;
        nextArtworkPreloadUrl = nextSong.art;
    }
}

function applyLyricsState() {
    var showPane = lyricsAvailable && !lyricsCollapsed;
    var showFab = lyricsAvailable && lyricsCollapsed;
    if (DOM.lyricsPane) {
        DOM.lyricsPane.classList.toggle('show', showPane);
        DOM.lyricsPane.setAttribute('aria-hidden', String(!showPane));
    }
    if (DOM.lyricsFab) {
        DOM.lyricsFab.classList.toggle('show', showFab);
        DOM.lyricsFab.tabIndex = showFab ? 0 : -1;
    }
}

function setLyricsCollapsed(collapsed) {
    lyricsCollapsed = !!collapsed;
    localStorage.setItem('drayLyricsCollapsed', String(lyricsCollapsed));
    applyLyricsState();
}

function showLyricsText(text, isStatus) {
    if (!DOM.lyricsText) return;
    DOM.lyricsText.textContent = text;
    DOM.lyricsText.classList.toggle('lyrics-status', !!isStatus);
    if (DOM.lyricsBody) DOM.lyricsBody.scrollTop = 0;
}

function updateLyricsForSong(song) {
    var requestId = ++lyricsRequestId;
    var lyricsUrl = song && song.lyrics ? song.lyrics : '';

    lyricsAvailable = !!lyricsUrl;
    applyLyricsState();

    if (!lyricsUrl) {
        showLyricsText('', false);
        if (DOM.lyricsSong) DOM.lyricsSong.textContent = '';
        return;
    }

    if (DOM.lyricsSong) DOM.lyricsSong.textContent = song.title || '';

    if (Object.prototype.hasOwnProperty.call(lyricsCache, lyricsUrl)) {
        showLyricsText(lyricsCache[lyricsUrl], false);
        return;
    }

    showLyricsText('Loading lyrics\u2026', true);
    fetch(lyricsUrl).then(function (response) {
        if (!response.ok) throw new Error('Lyrics request failed: ' + response.status);
        return response.text();
    }).then(function (text) {
        text = String(text || '').replace(/\r\n?/g, '\n').trim();
        lyricsCache[lyricsUrl] = text;
        if (requestId !== lyricsRequestId) return;
        showLyricsText(text || 'No lyrics found.', !text);
    })['catch'](function (error) {
        console.warn('Lyrics load failed:', error);
        if (requestId !== lyricsRequestId) return;
        showLyricsText("Couldn't load the lyrics.", true);
    });
}

function bindLyricsEvents() {
    if (DOM.btnCloseLyrics) DOM.btnCloseLyrics.addEventListener('click', function () { setLyricsCollapsed(true); });
    if (DOM.lyricsFab) DOM.lyricsFab.addEventListener('click', function () { setLyricsCollapsed(false); });
    applyLyricsState();
}

function playSong(index, shouldPlay, sharedTimestamp) {
    if (!DOM.audio || currentPlaylist.length === 0) return;

    currentIndex = (index + currentPlaylist.length) % currentPlaylist.length;
    var song = currentPlaylist[currentIndex];
    if (!song || !song.url) return;
    pendingSharedSongTimestamp = Number.isFinite(sharedTimestamp) && sharedTimestamp >= 0 ? sharedTimestamp : null;
    if (pendingSharedSongTimestamp !== null) pendingSeekPercent = null;
    document.body.classList.remove('no-song');
    setPlayerControlsDisabled(false);
    if (DOM.btnStop) DOM.btnStop.disabled = false;
    playbackRequested = shouldPlay !== false;
    localStorage.setItem('drayLastSongUrl', song.url);
    if (DOM.btnFavorite) DOM.btnFavorite.disabled = false;
    if (DOM.btnAddToPlaylist) DOM.btnAddToPlaylist.disabled = false;
    updateDownloadButton(song);

    trackSourceChanging = true;
    var sourceChangeId = ++trackSourceChangeId;
    setTimeout(function () {
        if (sourceChangeId === trackSourceChangeId) trackSourceChanging = false;
    }, 1500);
    DOM.audio.src = song.blobUrl || song.url;
    if (shouldPlay !== false) safePlay(DOM.audio);
    else updateTrayPlaybackState(false);
    updateTrackTimeLabels(0, 0);

    updatePlayback();

    if (DOM.currentTitle) DOM.currentTitle.textContent = song.title;
    if (DOM.currentArtist) DOM.currentArtist.textContent = song.artist;
    updateTrackArtwork(song);
    updateLyricsForSong(song);
    var playPauseIcon = shouldPlay === false ? 'play_arrow' : 'pause';
    if (DOM.btnPlayPause) DOM.btnPlayPause.innerHTML = '<span class="material-symbols-rounded">' + playPauseIcon + '</span>';
    if (DOM.btnFavorite) {
        if (favoriteUrls.indexOf(song.url) !== -1) {
            DOM.btnFavorite.classList.add('fav-active');
            if (DOM.menuBtnFavorite) DOM.menuBtnFavorite.classList.add('fav-active');
        } else {
            DOM.btnFavorite.classList.remove('fav-active');
            if (DOM.menuBtnFavorite) DOM.menuBtnFavorite.classList.remove('fav-active');
        }
    }

    if (DOM.nowplayingTitle) DOM.nowplayingTitle.textContent = song.title;
    if (DOM.nowplayingArtist) DOM.nowplayingArtist.textContent = song.artist;
    if (DOM.btnPlayPauseNowPlaying) {
        DOM.btnPlayPauseNowPlaying.innerHTML = '<span class="material-symbols-rounded">' + playPauseIcon + '</span>';
    }

    updateMediaSession(song);
    updateDiscordRPCForSong(song);
    if (shouldPlay === false && 'mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
    }
    if (window.audio !== DOM.audio) window.audio = DOM.audio;
    syncSongOffline(song.url);
    preloadNextQueueItem();
}

var songCardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.1 });

function compareAlphabetically(first, second) {
    return String(first || '').localeCompare(String(second || ''), undefined, { numeric: true, sensitivity: 'base' });
}

function sortSongsByTitle(songs) {
    return songs.sort(function (first, second) {
        return compareAlphabetically(first.title, second.title);
    });
}

function loadMusic() {
    var url = 'https://draydenthemiiyt-maker.github.io/draymusic.github.io/music.xml';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var xml;
            try {
                xml = new window.DOMParser().parseFromString(xhr.responseText, 'text/xml');
            } catch (e) { console.error('XML Parse Error', e); return; }

            var items = xml.getElementsByTagName('song');
            allSongs = [];

            for (var i = 0; i < items.length; i++) {
                var s = items[i];
                var getT = function (tag) {
                    var el = s.getElementsByTagName(tag)[0];
                    return el ? el.textContent : '';
                };
                allSongs.push({
                    title: getT('title') || 'Unknown Title',
                    artist: getT('artist') || 'Unknown Artist',
                    url: getT('url') || '',
                    art: getT('albumArt') || 'assets/icon.png',
                    copyrighted: getT('copyrighted').trim().toLowerCase(),
                    lyrics: getT('lyrics').trim()
                });
            }

            currentPlaylist = allSongs.slice(0);
            renderList(currentPlaylist);
            renderPlaylists();
            restoreLastPlayedSong();
        } else {
            console.error('Network error loading music');
        }
    };
    xhr.onerror = function () { console.error('Network error loading music'); };
    xhr.send();
}

function renderList(data, container) {
    if (!container) container = DOM.songList;
    if (!container) return;

    sortSongsByTitle(data);
    if (data.length === 0) {
        renderEmptySongState(container);
        return;
    }

    var html = '';
    for (var i = 0; i < data.length; i++) {
        var song = data[i];
        var isFav = (favoriteUrls.indexOf(song.url) !== -1);
        var starClass = isFav ? 'star-btn fav-active' : 'star-btn';

        html += '<div class="song-card" data-index="' + i + '" data-url="' + escapeHTML(song.url) + '">' +
            '<img src="' + escapeHTML(song.art) + '" alt="art">' +
            '<div class="info" style="flex:1;">' +
            '<h4>' + escapeHTML(song.title) + '</h4>' +
            '<p>' + escapeHTML(song.artist) + '</p>' +
            '</div>' +
            '</div>';
    }
    container.innerHTML = html;

var cards = container.querySelectorAll('.song-card');
for (var c = 0; c < cards.length; c++) {
    songCardObserver.observe(cards[c]);
        (function (card, idx) {
            card.addEventListener('click', function (e) {
                if (e.target.closest && e.target.closest('button')) return;
                currentPlaylist = data.slice(0);
                playSong(idx);
            });

            var touchTimer;
            var triggerContext = function (e, pageX, pageY) {
                e.preventDefault();
                showSongContextMenu(pageX, pageY, data[idx]);
            };

            card.addEventListener('contextmenu', function (e) {
                e.stopPropagation();
                triggerContext(e, e.pageX, e.pageY);
            });
            card.addEventListener('touchstart', function (e) {
                var touch = e.touches[0];
                touchTimer = setTimeout(function () { triggerContext(e, touch.pageX, touch.pageY); }, 600);
            }, { passive: true });
            card.addEventListener('touchend', function () { clearTimeout(touchTimer); });
            card.addEventListener('touchmove', function () { clearTimeout(touchTimer); });

        })(cards[c], Number(cards[c].getAttribute('data-index')));
    }
}

function renderEmptySongState(container) {
    container.innerHTML = '<p class="empty-song-state">Oops, there\'s nothing but crickets here! Check your spelling.</p>';
}

function renderFavorites() {
    if (!DOM.favoritesContainer) return;
    var favSongs = allSongs.filter(function (s) {
        return favoriteUrls.indexOf(s.url) !== -1;
    });
    if (favSongs.length === 0) {
        renderEmptySongState(DOM.favoritesContainer);
    } else {
        renderList(favSongs, DOM.favoritesContainer);
    }
}

function renderSidebarPlaylists() {
    if (!DOM.sidebarPlaylistList) return;
    if (!isElectronApp) {
        DOM.sidebarPlaylistList.innerHTML = '';
        return;
    }

    var playlistNames = getOrderedPlaylistNames();
    var staticPageCount = DOM.pageContainer.querySelectorAll('.page:not(.playlist-detail-page)').length;
    var sidebarHtml = '<div class="sidebar-playlists-header">' +
        '<span class="sidebar-playlists-heading">Your playlists</span>' +
        '<button type="button" class="sidebar-create-playlist" aria-label="Create playlist" title="Create playlist"><span class="material-symbols-rounded">add</span></button>' +
        '</div>';
    if (playlistNames.length === 0) {
        sidebarHtml += '<p class="sidebar-empty-playlists">Create a playlist!</p>';
    }
    for (var i = 0; i < playlistNames.length; i++) {
        var sidebarName = playlistNames[i];
        sidebarHtml += '<button class="sidebar-playlist-link" data-page="' + (staticPageCount + i) + '" data-name="' + escapeHTML(sidebarName) + '" title="' + escapeHTML(sidebarName) + '">' +
            '<span class="material-symbols-rounded">music_note</span>' +
            '<span class="sidebar-playlist-label">' + escapeHTML(sidebarName) + '</span>' +
            '</button>';
    }
    DOM.sidebarPlaylistList.innerHTML = sidebarHtml;
    bindPlaylistDragAndDrop(DOM.sidebarPlaylistList, '.sidebar-playlist-link', 'vertical');
    syncPlaylistDetailPages(playlistNames);
}

function getPlaylistDetailPage(playlistName) {
    if (!DOM.pageContainer) return null;
    var pages = DOM.pageContainer.querySelectorAll('.playlist-detail-page');
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].getAttribute('data-playlist') === playlistName) return pages[i];
    }
    return null;
}

function getActivePlaylistPage() {
    return DOM.pageContainer ? DOM.pageContainer.querySelector('.playlist-detail-page.active') : null;
}

function updateSidebarSelection(index) {
    var navLinks = document.querySelectorAll('.sidebar-link');
    for (var i = 0; i < navLinks.length; i++) {
        var isActive = Number(navLinks[i].getAttribute('data-page')) === index;
        navLinks[i].classList.toggle('active', isActive);
        if (isActive) navLinks[i].setAttribute('aria-current', 'page');
        else navLinks[i].removeAttribute('aria-current');
    }

    var playlistLinks = DOM.sidebarPlaylistList ? DOM.sidebarPlaylistList.querySelectorAll('.sidebar-playlist-link') : [];
    for (var j = 0; j < playlistLinks.length; j++) {
        var isPlaylistActive = Number(playlistLinks[j].getAttribute('data-page')) === index;
        playlistLinks[j].classList.toggle('active', isPlaylistActive);
        if (isPlaylistActive) playlistLinks[j].setAttribute('aria-current', 'page');
        else playlistLinks[j].removeAttribute('aria-current');
    }
}

function syncPlaylistDetailPages(playlistNames) {
    var pages = DOM.pageContainer.querySelectorAll('.playlist-detail-page');
    var activePageRemoved = false;
    for (var i = 0; i < pages.length; i++) {
        if (playlistNames.indexOf(pages[i].getAttribute('data-playlist')) === -1) {
            if (pages[i].classList.contains('active')) {
                pages[i].classList.remove('active');
                activePageRemoved = true;
            }
            pages[i].parentNode.removeChild(pages[i]);
        }
    }

    for (var j = 0; j < playlistNames.length; j++) {
        var playlistName = playlistNames[j];
        var page = getPlaylistDetailPage(playlistName);
        if (!page) {
            page = document.createElement('section');
            page.className = 'page playlist-detail-page';
            page.setAttribute('data-playlist', playlistName);
            page.innerHTML = '<div class="page-title-header">' +
                '<h2 class="playlist-page-title"></h2>' +
                '</div><div class="playlist-page-songs"></div>';
        }
        page.id = 'playlist-page-' + j;
        page.querySelector('.playlist-page-title').textContent = playlistName;
        DOM.pageContainer.appendChild(page);
    }

    var currentPages = DOM.pageContainer.querySelectorAll('.page');
    var activePageFound = false;
    for (var k = 0; k < currentPages.length; k++) {
        if (currentPages[k].classList.contains('active')) {
            currentPage = k;
            activePageFound = true;
            break;
        }
    }
    if (!activePageFound && activePageRemoved) {
        var playlistsPage = document.getElementById('playlistsList');
        if (playlistsPage) {
            playlistsPage.classList.add('active');
            currentPage = 2;
        }
    }
    updateSidebarSelection(currentPage);
}

function renderPlaylists() {
    if (!DOM.playlistsContainer) return;
    if (!isElectronApp) return;

    var html = '';
    var playlistNames = getOrderedPlaylistNames();
    renderSidebarPlaylists();
    if (playlistNames.length === 0) {
        DOM.playlistsContainer.innerHTML = '<p class="empty-playlist-state">Create a playlist from the sidebar!</p>';
        return;
    }

    for (var p = 0; p < playlistNames.length; p++) {
        var pName = playlistNames[p];
        var songUrls = userPlaylists[pName] || [];
        var plSongs = allSongs.filter(function (s) { return songUrls.indexOf(s.url) !== -1; });
        sortSongsByTitle(plSongs);

        var grids = '';
        for (var i = 0; i < 4; i++) {
            if (plSongs[i]) {
                grids += '<img src="' + escapeHTML(plSongs[i].art) + '" alt="art" draggable="false">';
            } else {
                grids += '<div class="blank-square"></div>';
            }
        }

        html += '<div class="playlist-card" data-name="' + escapeHTML(pName) + '">' +
            '<div class="playlist-art-grid">' + grids + '</div>' +
            '<h4>' + escapeHTML(pName) + '</h4>' +
            '<span>' + songUrls.length + ' songs</span>' +
            '</div>';
    }
    DOM.playlistsContainer.innerHTML = html;
    bindPlaylistDragAndDrop(DOM.playlistsContainer, '.playlist-card', 'grid');

    var folders = DOM.playlistsContainer.querySelectorAll('.playlist-card');
    for (var f = 0; f < folders.length; f++) {
        (function (folder) {
            var name = folder.getAttribute('data-name');

            folder.addEventListener('click', function () { openPlaylistDetail(name); });

            folder.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
                showPlaylistContextMenu(e.pageX, e.pageY, name);
            });

        })(folders[f]);
    }

    var detailPages = DOM.pageContainer.querySelectorAll('.playlist-detail-page');
    for (var d = 0; d < detailPages.length; d++) {
        renderPlaylistDetail(detailPages[d].getAttribute('data-playlist'));
    }
}

function getPlaylistPageIndex(playlistName) {
    var page = getPlaylistDetailPage(playlistName);
    if (!page || !DOM.pageContainer) return -1;
    return Array.prototype.indexOf.call(DOM.pageContainer.querySelectorAll('.page'), page);
}

function openPlaylistDetail(playlistName) {
    if (!Object.prototype.hasOwnProperty.call(userPlaylists, playlistName)) return;
    var activePlaylistPage = getActivePlaylistPage();
    if (activePlaylistPage && activePlaylistPage.getAttribute('data-playlist') === playlistName) return;
    if (!getPlaylistDetailPage(playlistName)) renderSidebarPlaylists();
    var pageIndex = getPlaylistPageIndex(playlistName);
    if (pageIndex < 0) return;
    if (!goToPage(pageIndex)) return;
    renderPlaylistDetail(playlistName);
}

function getSongsInPlaylist(playlistName) {
    var songUrls = userPlaylists[playlistName] || [];
    return sortSongsByTitle(allSongs.filter(function (song) {
        return songUrls.indexOf(song.url) !== -1;
    }));
}

function renderPlaylistDetail(playlistName) {
    var detailPage = getPlaylistDetailPage(playlistName);
    if (!detailPage) return;
    var songsContainer = detailPage.querySelector('.playlist-page-songs');
    var plSongs = getSongsInPlaylist(playlistName);

    if (plSongs.length === 0) {
        renderEmptySongState(songsContainer);
        return;
    }

    var html = '';
    for (var i = 0; i < plSongs.length; i++) {
        var s = plSongs[i];
        html += '<div class="song-card" data-url="' + escapeHTML(s.url) + '">' +
            '<img src="' + escapeHTML(s.art) + '" alt="art">' +
            '<div class="info" onclick="window.playSongFromList(\'' + escapeHTML(s.url) + '\')">' +
            '<h4>' + escapeHTML(s.title) + '</h4>' +
            '<p>' + escapeHTML(s.artist) + '</p>' +
            '</div>' +
            '</div>';
    }
    songsContainer.innerHTML = html;

    var detailCards = songsContainer.querySelectorAll('.song-card');
    for (var d = 0; d < detailCards.length; d++) {
        songCardObserver.observe(detailCards[d]);
        (function (card, song) {
            card.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                e.stopPropagation();
                showPlaylistSongContextMenu(e.pageX, e.pageY, playlistName, song);
            });
        })(detailCards[d], plSongs[d]);
    }
}

function removeSongFromPlaylist(playlistName, songUrl) {
    var currentSongs = userPlaylists[playlistName];
    if (!currentSongs) return;
    userPlaylists[playlistName] = currentSongs.filter(function (url) { return url !== songUrl; });
    savePlaylists();
    syncSongOffline(songUrl);
    renderPlaylists();
    renderPlaylistDetail(playlistName);
}

window.playSongFromList = function (url) {
    var activePage = getActivePlaylistPage();
    if (!activePage) return;

    var queue = getSongsInPlaylist(activePage.getAttribute('data-playlist'));
    for (var i = 0; i < queue.length; i++) {
        if (queue[i].url === url) {
            currentPlaylist = queue;
            playSong(i);
            return;
        }
    }
};

function goToPage(index) {
    if (isWidgetApp() && index !== 0) return false;
    if (!isElectronApp && (index === 2 || index === 3 || index >= 4)) return false;
    var pages = DOM.pageContainer ? DOM.pageContainer.querySelectorAll('.page') : [];
    if (index < 0 || index >= pages.length) return false;
    var nextPage = pages[index];
    if (!nextPage || nextPage.classList.contains('active')) return false;
    if (pageTransitionTimeout !== null) {
        clearTimeout(pageTransitionTimeout);
        pageTransitionTimeout = null;
    }

    var currentActivePage = DOM.pageContainer.querySelector('.page.active');
    for (var i = 0; i < pages.length; i++) {
        pages[i].classList.remove('leaving');
    }

    if (currentActivePage && currentActivePage !== nextPage) {
        currentActivePage.classList.remove('active');
        currentActivePage.classList.add('leaving');
        pageTransitionTimeout = setTimeout(function () {
            currentActivePage.classList.remove('leaving');
            pageTransitionTimeout = null;
        }, 180);
    }
    nextPage.classList.add('active');
    requestAnimationFrame(function () { nextPage.scrollTop = 0; });
    currentPage = index;

    updateSidebarSelection(index);
    if (index === 1) renderFavorites();
    if (index === 2) renderPlaylists();
    if (index === 3 && window.DrayThemes) window.DrayThemes.refresh();
    return true;
}

function positionContextMenu(x, y, menu) {
    var targetMenu = menu || DOM.contextMenu;
    targetMenu.style.visibility = 'hidden';
    targetMenu.style.display = 'block';

    var menuWidth = targetMenu.offsetWidth || 220;
    var menuHeight = targetMenu.offsetHeight || 250;

    var posX = Math.max(15, Math.min(x, window.innerWidth - menuWidth - 15));
    var posY = Math.max(15, Math.min(y, window.innerHeight - menuHeight - 15));

    targetMenu.style.left = posX + 'px';
    targetMenu.style.top = posY + 'px';
    targetMenu.style.visibility = 'visible';
}

function showDesktopLaunchContextMenu() {
    if (!DOM.contextMenu || !DOM.contextDesktopLaunchOptions) return;
    hideRenamePlaylistMenu();
    hideCreatePlaylistMenu();

    DOM.contextSongOptions.style.display = 'none';
    DOM.contextPlaylistOptions.style.display = 'none';
    DOM.contextPlaylistSongOptions.style.display = 'none';
    if (DOM.contextPlayerOptions) DOM.contextPlayerOptions.style.display = 'none';
    DOM.contextDesktopLaunchOptions.style.display = 'block';

    DOM.contextMenu.style.visibility = 'hidden';
    DOM.contextMenu.style.display = 'block';
    var menuWidth = DOM.contextMenu.offsetWidth || 260;
    var menuHeight = DOM.contextMenu.offsetHeight || 150;
    positionContextMenu(
        (window.innerWidth - menuWidth) / 2,
        (window.innerHeight - menuHeight) / 2
    );
}

function updateContextMenuBackdrop() {
    var backdrop = document.getElementById('contextMenuBackdrop');
    if (!backdrop) return;
    var menus = [DOM.contextMenu, DOM.renamePlaylistMenu, DOM.createPlaylistMenu];
    var isOpen = menus.some(function (menu) { return menu && menu.classList.contains('show'); });
    backdrop.classList.toggle('show', isOpen);
}

function hideRenamePlaylistMenu() {
    if (!DOM.renamePlaylistMenu) return;
    DOM.renamePlaylistMenu.classList.remove('show');
    DOM.renamePlaylistMenu.style.display = 'none';
    updateContextMenuBackdrop();
}

function hideCreatePlaylistMenu() {
    if (!DOM.createPlaylistMenu) return;
    DOM.createPlaylistMenu.classList.remove('show');
    DOM.createPlaylistMenu.style.display = 'none';
    updateContextMenuBackdrop();
}

function openCreatePlaylistMenu(x, y) {
    if (!isElectronApp) return;
    if (!DOM.createPlaylistMenu || !DOM.createPlaylistMenuInput) return;
    hideRenamePlaylistMenu();
    activeTargetPlaylist = null;
    activeTargetSong = null;
    DOM.createPlaylistMenuInput.value = '';
    DOM.contextMenu.classList.remove('show');
    DOM.contextMenu.style.visibility = 'hidden';
    positionContextMenu(x, y, DOM.createPlaylistMenu);
    DOM.createPlaylistMenu.classList.add('show');
    updateContextMenuBackdrop();
    DOM.createPlaylistMenuInput.focus();
}

function commitCreatePlaylist() {
    if (!DOM.createPlaylistMenuInput) return;
    var name = DOM.createPlaylistMenuInput.value.trim();
    if (!name) {
        DOM.createPlaylistMenuInput.focus();
        return;
    }
    if (Object.prototype.hasOwnProperty.call(userPlaylists, name)) {
        alert('A playlist with that name already exists.');
        DOM.createPlaylistMenuInput.focus();
        DOM.createPlaylistMenuInput.select();
        return;
    }

    userPlaylists[name] = [];
    savePlaylists();
    hideCreatePlaylistMenu();
    renderPlaylists();
}

function showSongContextMenu(x, y, song) {
    if (!isElectronApp) return;
    if (!DOM.contextMenu || !DOM.contextPlaylistItems) return;
    hideRenamePlaylistMenu();
    hideCreatePlaylistMenu();
    activeTargetSong = song;
    activeTargetPlaylist = null;

    DOM.contextPlaylistOptions.style.display = 'none';
    DOM.contextPlaylistSongOptions.style.display = 'none';
    DOM.contextSongOptions.style.display = 'block';
    if (DOM.contextDesktopLaunchOptions) DOM.contextDesktopLaunchOptions.style.display = 'none';

    if (DOM.contextPlayerOptions) DOM.contextPlayerOptions.style.display = 'none';

    positionContextMenu(x, y);

    var html = '';
    var playlistNames = getOrderedPlaylistNames();
    for (var i = 0; i < playlistNames.length; i++) {
        var pName = playlistNames[i];
        var hasSong = (userPlaylists[pName].indexOf(song.url) !== -1);
        var icon = hasSong ? 'check_box' : 'check_box_outline_blank';
        var accentColor = '#00a0ff';

        html += '<li data-name="' + escapeHTML(pName) + '">' + escapeHTML(pName) +
            '<span class="material-symbols-rounded" style="color:' + accentColor + '">' + icon + '</span></li>';
    }
    DOM.contextPlaylistItems.innerHTML = html;

    var items = DOM.contextPlaylistItems.querySelectorAll('li');
    for (var j = 0; j < items.length; j++) {
        (function (item) {
            item.addEventListener('click', function () {
                var name = item.getAttribute('data-name');
                var idx = userPlaylists[name].indexOf(activeTargetSong.url);

                if (idx === -1) userPlaylists[name].push(activeTargetSong.url);
                else userPlaylists[name].splice(idx, 1);

                savePlaylists();
                syncSongOffline(activeTargetSong.url);
                renderPlaylists();

                var activePlaylistPage = getActivePlaylistPage();
                if (activePlaylistPage && activePlaylistPage.getAttribute('data-playlist') === name) {
                    renderPlaylistDetail(name);
                }
                DOM.contextMenu.style.display = 'none';
            });
        })(items[j]);
    }
}

function showPlaylistContextMenu(x, y, playlistName) {
    if (!DOM.contextMenu) return;
    hideRenamePlaylistMenu();
    hideCreatePlaylistMenu();
    activeTargetPlaylist = playlistName;
    activeTargetSong = null;

    DOM.contextSongOptions.style.display = 'none';
    DOM.contextPlaylistOptions.style.display = 'block';
    DOM.contextPlaylistSongOptions.style.display = 'none';
    if (DOM.contextDesktopLaunchOptions) DOM.contextDesktopLaunchOptions.style.display = 'none';

    if (DOM.contextPlayerOptions) DOM.contextPlayerOptions.style.display = 'none';

    positionContextMenu(x, y);
}

function showPlaylistSongContextMenu(x, y, playlistName, song) {
    if (!DOM.contextMenu) return;
    hideRenamePlaylistMenu();
    hideCreatePlaylistMenu();
    activeTargetPlaylist = playlistName;
    activeTargetSong = song;

    DOM.contextSongOptions.style.display = 'none';
    DOM.contextPlaylistOptions.style.display = 'none';
    DOM.contextPlaylistSongOptions.style.display = 'block';
    if (DOM.contextDesktopLaunchOptions) DOM.contextDesktopLaunchOptions.style.display = 'none';
    if (DOM.contextPlayerOptions) DOM.contextPlayerOptions.style.display = 'none';

    positionContextMenu(x, y);
}

function openRenamePlaylistMenu() {
    if (!activeTargetPlaylist || !DOM.renamePlaylistMenu || !DOM.renamePlaylistInput) return;
    hideCreatePlaylistMenu();

    var x = parseFloat(DOM.contextMenu.style.left) || 15;
    var y = parseFloat(DOM.contextMenu.style.top) || 15;
    DOM.renamePlaylistInput.value = activeTargetPlaylist;
    DOM.contextMenu.classList.remove('show');
    DOM.contextMenu.style.visibility = 'hidden';
    positionContextMenu(x, y, DOM.renamePlaylistMenu);
    DOM.renamePlaylistMenu.classList.add('show');
    updateContextMenuBackdrop();
    DOM.renamePlaylistInput.focus();
    DOM.renamePlaylistInput.select();
}

function commitPlaylistRename() {
    var oldName = activeTargetPlaylist;
    if (!oldName || !DOM.renamePlaylistInput) return;

    var newName = DOM.renamePlaylistInput.value.trim();
    if (!newName) {
        DOM.renamePlaylistInput.focus();
        return;
    }
    if (newName === oldName) {
        hideRenamePlaylistMenu();
        activeTargetPlaylist = null;
        return;
    }
    if (Object.prototype.hasOwnProperty.call(userPlaylists, newName)) {
        alert('A playlist with that name already exists.');
        DOM.renamePlaylistInput.focus();
        DOM.renamePlaylistInput.select();
        return;
    }

    var activePage = getActivePlaylistPage();
    var wasActive = activePage && activePage.getAttribute('data-playlist') === oldName;
    var orderedNames = getOrderedPlaylistNames();
    var playlistOrderIndex = orderedNames.indexOf(oldName);
    var songsToSync = userPlaylists[oldName] || [];
    userPlaylists[newName] = songsToSync;
    delete userPlaylists[oldName];
    if (playlistOrderIndex !== -1) {
        orderedNames[playlistOrderIndex] = newName;
        playlistOrder = orderedNames;
    }
    savePlaylists();
    songsToSync.forEach(function (url) { syncSongOffline(url); });

    hideRenamePlaylistMenu();
    DOM.contextMenu.style.display = 'none';
    renderPlaylists();
    if (wasActive) openPlaylistDetail(newName);
    activeTargetPlaylist = null;
}

function createImpulseResponse(duration, decay) {
    if (!audioCtx) return null;
    var sampleRate = audioCtx.sampleRate;
    var length = sampleRate * duration;
    var impulse = audioCtx.createBuffer(2, length, sampleRate);

    for (var i = 0; i < 2; i++) {
        var channelData = impulse.getChannelData(i);
        for (var j = 0; j < length; j++) {
            channelData[j] = (Math.random() * 2 - 1) * Math.pow(1 - j / length, decay);
        }
    }
    return impulse;
}

function initAudioEngine() {
    if (audioCtx) return;
    try {
        var AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        audioCtx = new AudioContextClass();
        var source = audioCtx.createMediaElementSource(DOM.audio);
        
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        
        var freqs = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
        
        source.connect(analyser);
        var lastNode = analyser; 

        for (var i = 0; i < freqs.length; i++) {
            var f = audioCtx.createBiquadFilter();
            f.type = (i === 0) ? 'lowshelf' : ((i === 9) ? 'highshelf' : 'peaking');
            f.frequency.value = freqs[i];
            f.gain.value = 0;
            lastNode.connect(f);
            filters.push(f);
            lastNode = f;
        }

        splitterNode = audioCtx.createChannelSplitter(2);
        mergerNode = audioCtx.createChannelMerger(2);
        
        midGainNode = audioCtx.createGain();
        sideGainNode = audioCtx.createGain();
        
        midGainNode.gain.value = 1;
        sideGainNode.gain.value = 1;

        var invertGain = audioCtx.createGain();
        invertGain.gain.value = -1;

        lastNode.connect(splitterNode);
        splitterNode.connect(midGainNode, 0);
        splitterNode.connect(midGainNode, 1);
        splitterNode.connect(sideGainNode, 0);
        splitterNode.connect(invertGain, 1);
        invertGain.connect(sideGainNode);
        midGainNode.connect(mergerNode, 0, 0);
        midGainNode.connect(mergerNode, 0, 1);
        sideGainNode.connect(mergerNode, 0, 0);
        
        var sideInvertOut = audioCtx.createGain();
        sideInvertOut.gain.value = -1;
        sideGainNode.connect(sideInvertOut);
        sideInvertOut.connect(mergerNode, 0, 1);

        var processedNode = mergerNode;

        echoDelayNode = audioCtx.createDelay(2.0);
        echoFeedbackNode = audioCtx.createGain();
        echoWetGainNode = audioCtx.createGain();
        echoDelayNode.delayTime.value = 0.3;
        echoFeedbackNode.gain.value = 0.3;
        echoWetGainNode.gain.value = 0;
        processedNode.connect(echoDelayNode);
        echoDelayNode.connect(echoFeedbackNode);
        echoFeedbackNode.connect(echoDelayNode);
        echoDelayNode.connect(echoWetGainNode);
        dryGain = audioCtx.createGain();
        wetGain = audioCtx.createGain();
        dryGain.gain.value = 1;
        wetGain.gain.value = 0;
        reverbNode = audioCtx.createConvolver();
        reverbNode.buffer = createImpulseResponse(3, 4);
        processedNode.connect(dryGain);
        processedNode.connect(reverbNode);
        reverbNode.connect(wetGain);
        dryGain.connect(audioCtx.destination);
        wetGain.connect(audioCtx.destination);
        echoWetGainNode.connect(audioCtx.destination);

        applyAudioSettingsToNodes();

    } catch (e) {
        console.warn("Audio Engine Init Failed:", e);
    }
}

function updatePlayback() {
    if (!DOM.audio) return;
    if (DOM.speedSlider) {
        var speed = parseFloat(DOM.speedSlider.value) * (isSpaceSpeedBoostActive ? 2 : 1);
        DOM.audio.playbackRate = speed;
        if (DOM.speedLabel) DOM.speedLabel.textContent = speed.toFixed(2) + 'x';
    }
    if (DOM.preservePitch) {
        var lock = DOM.preservePitch.checked;
        DOM.audio.preservesPitch = lock;
        DOM.audio.mozPreservesPitch = lock;
    }
}

function updateDiscordRPCForSong(song) {
    if (!song || song.url === lastDiscordSongUrl || !windowApi || !windowApi.updateDiscordRPC) return;
    lastDiscordSongUrl = song.url;
    windowApi.updateDiscordRPC({
        title: song.title,
        artist: song.artist,
        art: song.art
    });
}

function updateDiscordRPCForBrowsing() {
    lastDiscordSongUrl = null;
    if (!windowApi || !windowApi.updateDiscordRPC) return;
    windowApi.updateDiscordRPC({
        title: 'Browsing the library',
        artist: 'DrayMusic',
        art: 'logo'
    });
}

function bindLiveSlider(el, callback) {
    if (!el) return;
    el.addEventListener('input', callback);
    el.addEventListener('change', callback);
}

function blurSliderAfterPointerInteraction(slider) {
    if (!slider) return;
    slider.addEventListener('pointerup', function () {
        if (document.activeElement === slider) slider.blur();
    });
}

function bindEvents() {
    if (DOM.audioEffectsHeading && window.api && window.api.openDevTools) {
        var audioEffectsHeadingClicks = 0;
        DOM.audioEffectsHeading.addEventListener('click', function () {
            audioEffectsHeadingClicks++;
            if (audioEffectsHeadingClicks === 8) {
                audioEffectsHeadingClicks = 0;
                window.api.openDevTools();
            }
        });
    }

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });
    document.addEventListener('keydown', function (e) {
        var target = e.target;
        var key = e.key.toLowerCase();
        var isSearchShortcut = key === '/';
        if (e.altKey || e.ctrlKey || e.metaKey || (e.shiftKey && !isSearchShortcut) ||
            (target && (target.isContentEditable ||
                (target.matches && target.matches('input, textarea, select'))))) return;

        if (isSpaceKey(e.key)) {
            startSpacePress(e);
            return;
        }
        if (isSearchShortcut) {
            e.preventDefault();
            if (DOM.searchInput) DOM.searchInput.focus();
            return;
        }

        switch (key) {
            case 'arrowleft':
                e.preventDefault();
                seekBySeconds(-5);
                break;
            case 'arrowright':
                e.preventDefault();
                seekBySeconds(5);
                break;
            case 'arrowup':
                e.preventDefault();
                playSong(currentIndex < 0 ? currentPlaylist.length - 1 : currentIndex - 1);
                break;
            case 'arrowdown':
                e.preventDefault();
                playSong(currentIndex + 1);
                break;
            case 'j':
                e.preventDefault();
                seekBySeconds(-10);
                break;
            case 'l':
                e.preventDefault();
                seekBySeconds(10);
                break;
            case 'home':
                e.preventDefault();
                if (currentPlaylist[currentIndex]) seekToPercent(0);
                break;
            case 'end':
                e.preventDefault();
                if (currentPlaylist[currentIndex] && DOM.audio && Number.isFinite(DOM.audio.duration)) {
                    seekToSeconds(DOM.audio.duration - 10);
                }
                break;
            case 'k':
                e.preventDefault();
                if (DOM.btnPlayPause) DOM.btnPlayPause.click();
                break;
        }
        if (/^[0-9]$/.test(key) && currentPlaylist[currentIndex]) {
            e.preventDefault();
            seekToPercent(Number(key) * 10);
        }
    });
    document.addEventListener('keyup', function (e) {
        if (isSpaceKey(e.key)) finishSpacePress(true);
    });
    window.addEventListener('blur', function () {
        finishSpacePress(false);
    });
    document.addEventListener('input', function (e) {
        if (e.target && e.target.matches && e.target.matches('input[type="range"]')) {
            updateRangeFill(e.target);
        }
    });
    document.addEventListener('change', function (e) {
        if (e.target && e.target.matches && e.target.matches('input[type="range"]')) {
            updateRangeFill(e.target);
        }
    });

    if (DOM.btnVolume) DOM.btnVolume.addEventListener('click', function () {
        setAudioMuted(!isAudioMuted);
    });
    if (DOM.masterVolumeSlider) DOM.masterVolumeSlider.addEventListener('input', function () {
        lastMasterVolume = Number(DOM.masterVolumeSlider.value);
        if (DOM.audio) DOM.audio.volume = lastMasterVolume;
        updateMasterVolumePercent();
        try {
            localStorage.setItem('drayMasterVolume', String(lastMasterVolume));
        } catch (e) {}
        if (isAudioMuted) setAudioMuted(false);
        else updateVolumeButton();
    });
    blurSliderAfterPointerInteraction(DOM.masterVolumeSlider);
    blurSliderAfterPointerInteraction(DOM.seekBar);
    blurSliderAfterPointerInteraction(DOM.seekBarNowPlaying);

    if (DOM.btnPlayPauseNowPlaying) {
        DOM.btnPlayPauseNowPlaying.addEventListener('click', function () {
            if (DOM.audio.paused) {
                DOM.audio.play();
                this.innerHTML = '<span class="material-symbols-rounded">pause</span>';
            } else {
                pauseAudio();
                this.innerHTML = '<span class="material-symbols-rounded">play_arrow</span>';
            }
        });
    }

    if (DOM.btnNextNowPlaying) {
        DOM.btnNextNowPlaying.addEventListener('click', function() { playSong(currentIndex + 1); });
    }
    if (DOM.btnPrevNowPlaying) {
        DOM.btnPrevNowPlaying.addEventListener('click', function() { playSong(currentIndex - 1); });
    }

    if (windowApi && windowApi.onTrayPrevious && DOM.btnPrev) {
        windowApi.onTrayPrevious(function () { DOM.btnPrev.click(); });
    }
    if (windowApi && windowApi.onTrayPlayPause && DOM.btnPlayPause) {
        windowApi.onTrayPlayPause(function () { DOM.btnPlayPause.click(); });
    }
    if (windowApi && windowApi.onTrayNext && DOM.btnNext) {
        windowApi.onTrayNext(function () { DOM.btnNext.click(); });
    }

    bindLiveSlider(DOM.stereoWidthSlider, function (e) {
        var val = parseFloat(e.target.value);
        if (sideGainNode) sideGainNode.gain.value = val;
        var lbl = document.getElementById('stereoWidthLabel');
        if (lbl) lbl.textContent = val.toFixed(2);
    });

    bindLiveSlider(DOM.centerGainSlider, function (e) {
        var val = parseFloat(e.target.value);
        if (midGainNode) midGainNode.gain.value = val;
        var lbl = document.getElementById('centerGainLabel');
        if (lbl) lbl.textContent = val.toFixed(2);
    });

    bindLiveSlider(DOM.echoTimeSlider, function (e) {
        var val = parseFloat(e.target.value);
        if (echoDelayNode) echoDelayNode.delayTime.value = val;
        var lbl = document.getElementById('echoTimeLabel');
        if (lbl) lbl.textContent = val.toFixed(2) + 's';
    });

    bindLiveSlider(DOM.echoFeedbackSlider, function (e) {
        var val = parseFloat(e.target.value);
        if (echoFeedbackNode) echoFeedbackNode.gain.value = val;
        var lbl = document.getElementById('echoFeedbackLabel');
        if (lbl) lbl.textContent = val.toFixed(2);
    });

    bindLiveSlider(DOM.echoMixSlider, function (e) {
        var val = parseFloat(e.target.value);
        if (echoWetGainNode) echoWetGainNode.gain.value = val;
        var lbl = document.getElementById('echoMixLabel');
        if (lbl) lbl.textContent = val.toFixed(2);
    });
    
    DOM.audio.addEventListener('timeupdate', function() {
        if (DOM.seekBarNowPlaying && DOM.audio.duration) {
            DOM.seekBarNowPlaying.max = DOM.audio.duration;
            DOM.seekBarNowPlaying.value = DOM.audio.currentTime;
            updateRangeFill(DOM.seekBarNowPlaying);
        }
    });

    if (DOM.seekBarNowPlaying) {
        DOM.seekBarNowPlaying.addEventListener('input', function() {
            DOM.audio.currentTime = this.value;
            updateRangeFill(this);
            updateTrackTimeLabels(DOM.audio.currentTime, DOM.audio.duration);
        });
    }

if (isElectronApp && DOM.openNowPlaying && DOM.nowplayingPane) {
    DOM.openNowPlaying.addEventListener('click', function () {
        DOM.nowplayingPane.classList.add('open');
        
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error("Error attempting to enable fullscreen:", err);
            });
        }
    });
}

if (DOM.btnCloseNowPlaying && DOM.nowplayingPane) {
    DOM.btnCloseNowPlaying.addEventListener('click', function () {
        DOM.nowplayingPane.classList.remove('open');
        
        if (document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.error("Error attempting to exit fullscreen:", err);
            });
        }
    });
}

    if (DOM.btnPlayPause) {
        DOM.btnPlayPause.addEventListener('click', function () {
            if (DOM.audio.paused) {
                safePlay(DOM.audio);
                DOM.btnPlayPause.innerHTML = '<span class="material-symbols-rounded">pause</span>';
            } else {
                pauseAudio();
                DOM.btnPlayPause.innerHTML = '<span class="material-symbols-rounded">play_arrow</span>';
            }
        });
    }

    if (DOM.btnNext) DOM.btnNext.addEventListener('click', function () { playSong(currentIndex + 1); });
    if (DOM.btnPrev) DOM.btnPrev.addEventListener('click', function () { playSong(currentIndex - 1); });
    if (DOM.btnLoop) {
        DOM.btnLoop.addEventListener('click', function () {
            isLooping = !isLooping;
            if (isLooping) {
                DOM.btnLoop.classList.add('active');
                if (DOM.menuBtnLoop) DOM.menuBtnLoop.classList.add('active');
            } else {
                DOM.btnLoop.classList.remove('active');
                if (DOM.menuBtnLoop) DOM.menuBtnLoop.classList.remove('active');
            }
        });
    }

    if (DOM.seekBar) {
        var startSeeking = function () { if (DOM.progressWrapper) DOM.progressWrapper.classList.add('seeking'); };
        var stopSeeking = function () { if (DOM.progressWrapper) DOM.progressWrapper.classList.remove('seeking'); };

        bindLiveSlider(DOM.seekBar, function (e) {
            updateSeekUI(e.target.value);
            applySeekToAudio(e.target.value);
            updateTrackTimeLabels(
                (Number(e.target.value) / 100) * DOM.audio.duration,
                DOM.audio.duration
            );
        });

        DOM.seekBar.addEventListener('pointerdown', startSeeking);
        DOM.seekBar.addEventListener('touchstart', startSeeking);
        DOM.seekBar.addEventListener('mousedown', startSeeking);

        window.addEventListener('pointerup', stopSeeking);
        window.addEventListener('pointercancel', stopSeeking);
        window.addEventListener('touchend', stopSeeking);
        window.addEventListener('mouseup', stopSeeking);
    }

    if (DOM.audio) {
        DOM.audio.addEventListener('emptied', function () {
            if (currentIndex === -1) updateMediaSession(null);
        });

        DOM.audio.addEventListener('loadedmetadata', function () {
            trackSourceChanging = false;
            trackSourceChangeId++;
            if (pendingSharedSongTimestamp !== null) {
                seekToSeconds(pendingSharedSongTimestamp);
                pendingSharedSongTimestamp = null;
            }
            if (pendingSeekPercent !== null) applySeekToAudio(pendingSeekPercent);
            if (isFinite(DOM.audio.duration)) {
                updateSeekUI((DOM.audio.currentTime / DOM.audio.duration) * 100);
                if (DOM.seekBarNowPlaying) {
                    DOM.seekBarNowPlaying.max = DOM.audio.duration;
                    DOM.seekBarNowPlaying.value = DOM.audio.currentTime;
                    updateRangeFill(DOM.seekBarNowPlaying);
                }
            }
            updateTrackTimeLabels(DOM.audio.currentTime, DOM.audio.duration);
            updatePlayback();
            if ('mediaSession' in navigator && !DOM.audio.paused) {
                navigator.mediaSession.playbackState = 'playing';
            }
            if ('mediaSession' in navigator && typeof navigator.mediaSession.setPositionState === 'function') {
                try {
                    navigator.mediaSession.setPositionState({
                        duration: DOM.audio.duration || 0,
                        position: DOM.audio.currentTime || 0,
                        playbackRate: DOM.audio.playbackRate || 1
                    });
                } catch (e) {}
            }
        });

        DOM.audio.addEventListener('timeupdate', function () {
            if (DOM.progressWrapper && DOM.progressWrapper.classList.contains('seeking')) return;
            if (isFinite(DOM.audio.duration)) updateSeekUI((DOM.audio.currentTime / DOM.audio.duration) * 100);
            if (DOM.seekBarNowPlaying && isFinite(DOM.audio.duration)) {
                DOM.seekBarNowPlaying.max = DOM.audio.duration;
                DOM.seekBarNowPlaying.value = DOM.audio.currentTime;
                updateRangeFill(DOM.seekBarNowPlaying);
            }
            updateTrackTimeLabels(DOM.audio.currentTime, DOM.audio.duration);
            if ('mediaSession' in navigator && typeof navigator.mediaSession.setPositionState === 'function') {
                try {
                    navigator.mediaSession.setPositionState({
                        duration: DOM.audio.duration || 0,
                        position: DOM.audio.currentTime || 0,
                        playbackRate: DOM.audio.playbackRate || 1
                    });
                } catch (e) {}
            }
        });

        DOM.audio.addEventListener('ended', function () {
            trackSourceChanging = true;
            if (isLooping) {
                DOM.audio.currentTime = 0;
                safePlay(DOM.audio);
            } else {
                playSong(currentIndex + 1);
            }
        });

        DOM.audio.addEventListener('play', function () {
            playbackRequested = true;
            updateTrayPlaybackState(true);
            trackSourceChanging = false;
            trackSourceChangeId++;
            initAudioEngine();
            if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
            updatePlayback();
            updatePlayPauseButtons();
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
        });

        DOM.audio.addEventListener('pause', function () {
            if (trackSourceChanging) return;
            playbackRequested = false;
            updateTrayPlaybackState(false);
            updatePlayPauseButtons();
            if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
        });

        DOM.audio.addEventListener('error', function () {
            trackSourceChanging = false;
            trackSourceChangeId++;
        });
    }

    if (DOM.searchInput) {
        bindLiveSlider(DOM.searchInput, function (e) {
            if (currentPage !== 0 && e.target.value.trim().length > 0 && !isWidgetApp()) goToPage(0);
            var q = e.target.value.toLowerCase();
            var searchResults = allSongs.filter(function (s) {
                return s.title.toLowerCase().indexOf(q) !== -1 || s.artist.toLowerCase().indexOf(q) !== -1;
            });
            renderList(searchResults);
        });
    }

    var navLinks = document.querySelectorAll('.sidebar-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function () {
            goToPage(Number(this.getAttribute('data-page')));
        });
    }

    if (DOM.sidebarPlaylistList) {
        DOM.sidebarPlaylistList.addEventListener('click', function (e) {
            var createButton = e.target.closest('.sidebar-create-playlist');
            if (createButton) {
                e.preventDefault();
                e.stopPropagation();
                var bounds = createButton.getBoundingClientRect();
                openCreatePlaylistMenu(bounds.left, bounds.bottom);
                return;
            }
            var link = e.target.closest('.sidebar-playlist-link');
            if (link) openPlaylistDetail(link.getAttribute('data-name'));
        });

        DOM.sidebarPlaylistList.addEventListener('contextmenu', function (e) {
            var link = e.target.closest('.sidebar-playlist-link');
            if (!link) return;
            e.preventDefault();
            e.stopPropagation();
            showPlaylistContextMenu(e.pageX, e.pageY, link.getAttribute('data-name'));
        });
    }

    if (DOM.sidebarToggle && DOM.appLayout) {
        DOM.sidebarToggle.addEventListener('click', function () {
            if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches) {
                restoreSidebarState();
                return;
            }
            var isCollapsed = DOM.appLayout.classList.toggle('sidebar-collapsed');
            var icon = DOM.sidebarToggle.querySelector('.material-symbols-rounded');
            var label = isCollapsed ? 'Expand sidebar' : 'Collapse sidebar';
            DOM.sidebarToggle.setAttribute('aria-label', label);
            DOM.sidebarToggle.title = label;
            if (icon) icon.textContent = isCollapsed ? 'left_panel_open' : 'left_panel_close';
            localStorage.setItem('draySidebarCollapsed', String(isCollapsed));
        });
        window.addEventListener('resize', restoreSidebarState);
    }

    if (DOM.btnFavorite) {
        DOM.btnFavorite.addEventListener('click', function () {
            if (currentIndex < 0 || !currentPlaylist[currentIndex]) return;

            var song = currentPlaylist[currentIndex];
            var url = song.url;
            var idx = favoriteUrls.indexOf(url);

            var cards = document.querySelectorAll('.song-card');
            cards.forEach(function (card) {
                if (card.getAttribute('data-url') === url) {
                    var star = card.querySelector('.star-btn');
                    if (star) {
                        if (idx === -1) star.classList.add('fav-active');
                        else star.classList.remove('fav-active');
                    }
                }
            });

            if (idx === -1) {
                favoriteUrls.push(url);
                DOM.btnFavorite.classList.add('fav-active');
                if (DOM.menuBtnFavorite) DOM.menuBtnFavorite.classList.add('fav-active');
            } else {
                favoriteUrls.splice(idx, 1);
                DOM.btnFavorite.classList.remove('fav-active');
                if (DOM.menuBtnFavorite) DOM.menuBtnFavorite.classList.remove('fav-active');
            }

            saveFavorites();
            syncSongOffline(url);

            if (currentPage === 1) renderFavorites();
        });
    }

    if (DOM.btnAddToPlaylist) {
        DOM.btnAddToPlaylist.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!isElectronApp) return;
            if (currentIndex < 0 || !currentPlaylist[currentIndex]) return;
            var bounds = this.getBoundingClientRect();
            showSongContextMenu(bounds.left, bounds.top, currentPlaylist[currentIndex]);
        });
    }

    if (DOM.btnDownloadSong) {
        DOM.btnDownloadSong.addEventListener('click', downloadCurrentSong);
    }

    if (DOM.btnShareSong) {
        DOM.btnShareSong.addEventListener('click', shareCurrentSong);
    }

    if (DOM.shareWithTimestamp) {
        DOM.shareWithTimestamp.checked = false;
        if (DOM.shareTimestampField) DOM.shareTimestampField.hidden = true;
        if (DOM.shareTimestampInput) DOM.shareTimestampInput.disabled = true;
        DOM.shareWithTimestamp.addEventListener('change', function () {
            var includeTimestamp = DOM.shareWithTimestamp.checked;
            if (DOM.shareTimestampField) DOM.shareTimestampField.hidden = !includeTimestamp;
            if (DOM.shareTimestampInput) {
                DOM.shareTimestampInput.disabled = !includeTimestamp || DOM.shareWithTimestamp.disabled;
                if (includeTimestamp) {
                    var currentTime = DOM.audio && Number.isFinite(DOM.audio.currentTime) ? DOM.audio.currentTime : 0;
                    DOM.shareTimestampInput.value = formatTrackTime(currentTime);
                }
            }
        });
    }

    if (DOM.btnPlayInDesktop) {
        DOM.btnPlayInDesktop.addEventListener('click', function () {
            var song = currentPlaylist[currentIndex];
            if (!song) return;
            pauseAudio();
            if (desktopLaunchMenuTimeout) clearTimeout(desktopLaunchMenuTimeout);
            desktopLaunchMenuTimeout = setTimeout(function () {
                showDesktopLaunchContextMenu();
            }, 3000);
            window.location.href = 'draymusic://song?title=' + encodeURIComponent(song.title || '');
        });
    }

    if (DOM.btnCloseDesktopLaunchNotice && DOM.contextMenu) {
        DOM.btnCloseDesktopLaunchNotice.addEventListener('click', function () {
            DOM.contextMenu.style.display = 'none';
        });
    }

    if (DOM.btnStop) {
        DOM.btnStop.addEventListener('click', function () {
            stopCurrentSong();
        });
    }

    DOM.menuBtnLoop.addEventListener('click', function () {
        DOM.btnLoop.click();
        DOM.contextMenu.style.display = 'none';
    });

    DOM.menuBtnEQ.addEventListener('click', function () {
        goToPage(3);
        DOM.contextMenu.style.display = 'none';
    });

    DOM.menuBtnStop.addEventListener('click', function () {
        DOM.btnStop.click();
        DOM.contextMenu.style.display = 'none';
    });

    DOM.menuBtnFavorite.addEventListener('click', function () {
        DOM.btnFavorite.click();
        DOM.contextMenu.style.display = 'none';
    });

    document.addEventListener('click', function (e) {
        var insideContextMenu = DOM.contextMenu && DOM.contextMenu.contains(e.target);
        var insideRenameMenu = DOM.renamePlaylistMenu && DOM.renamePlaylistMenu.contains(e.target);
        var insideCreateMenu = DOM.createPlaylistMenu && DOM.createPlaylistMenu.contains(e.target);
        var onSongOrPlaylist = e.target.closest('.song-card') || e.target.closest('.playlist-card');
        if (!insideContextMenu && !insideRenameMenu && !insideCreateMenu && !onSongOrPlaylist) {
            DOM.contextMenu.style.display = 'none';
            hideRenamePlaylistMenu();
            hideCreatePlaylistMenu();
        }
    });

    if (DOM.btnRemoveSongFromPlaylist) {
        DOM.btnRemoveSongFromPlaylist.addEventListener('click', function () {
            if (activeTargetPlaylist && activeTargetSong) {
                removeSongFromPlaylist(activeTargetPlaylist, activeTargetSong.url);
                DOM.contextMenu.style.display = 'none';
            }
        });
    }

    if (DOM.btnCreatePlaylist && DOM.newPlaylistInput) {
        DOM.btnCreatePlaylist.addEventListener('click', function () {
            var name = DOM.newPlaylistInput.value.trim();
            if (name && !userPlaylists[name]) {
                userPlaylists[name] = activeTargetSong ? [activeTargetSong.url] : [];
                savePlaylists();
                if (activeTargetSong) {
                    syncSongOffline(activeTargetSong.url);
                }
                renderPlaylists();
                DOM.newPlaylistInput.value = '';
                DOM.contextMenu.style.display = 'none';
            }
        });
    }

    if (DOM.btnRenamePlaylist) {
        DOM.btnRenamePlaylist.addEventListener('click', function () {
            openRenamePlaylistMenu();
        });
    }

    if (DOM.btnCancelRenamePlaylist) {
        DOM.btnCancelRenamePlaylist.addEventListener('click', function () {
            hideRenamePlaylistMenu();
            activeTargetPlaylist = null;
        });
    }

    if (DOM.btnConfirmRenamePlaylist) {
        DOM.btnConfirmRenamePlaylist.addEventListener('click', commitPlaylistRename);
    }

    if (DOM.renamePlaylistInput) {
        DOM.renamePlaylistInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                commitPlaylistRename();
            } else if (e.key === 'Escape') {
                hideRenamePlaylistMenu();
                activeTargetPlaylist = null;
            }
        });
    }

    if (DOM.btnCancelCreatePlaylist) {
        DOM.btnCancelCreatePlaylist.addEventListener('click', hideCreatePlaylistMenu);
    }

    if (DOM.btnConfirmCreatePlaylist) {
        DOM.btnConfirmCreatePlaylist.addEventListener('click', commitCreatePlaylist);
    }

    if (DOM.createPlaylistMenuInput) {
        DOM.createPlaylistMenuInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                commitCreatePlaylist();
            } else if (e.key === 'Escape') {
                hideCreatePlaylistMenu();
            }
        });
    }

    if (DOM.btnDeletePlaylist) {
        DOM.btnDeletePlaylist.addEventListener('click', function () {
            if (activeTargetPlaylist) {
                var activePlaylistPage = getActivePlaylistPage();
                if (activePlaylistPage && activePlaylistPage.getAttribute('data-playlist') === activeTargetPlaylist) {
                    goToPage(2);
                }
                var songsInDeletedPlaylist = userPlaylists[activeTargetPlaylist] || [];
                delete userPlaylists[activeTargetPlaylist];
                savePlaylists();

                songsInDeletedPlaylist.forEach(function (url) {
                    syncSongOffline(url);
                });

                renderPlaylists();
                DOM.contextMenu.style.display = 'none';
            }
        });
    }

    bindLiveSlider(DOM.speedSlider, updatePlayback);
    if (DOM.preservePitch) DOM.preservePitch.addEventListener('change', updatePlayback);

    bindLiveSlider(DOM.drySlider, function (e) { if (dryGain) dryGain.gain.value = e.target.value; });
    bindLiveSlider(DOM.wetSlider, function (e) { if (wetGain) wetGain.gain.value = e.target.value; });

    for (var i = 0; i < 10; i++) {
        (function (index) {
            var slider = document.getElementById('eqSlider' + index);
            bindLiveSlider(slider, function (e) {
                if (filters[index]) filters[index].gain.value = e.target.value;
            });
        })(i);
    }

    var settingsControls = getAudioSettingsControls();
    for (var j = 0; j < settingsControls.length; j++) {
        settingsControls[j].addEventListener('input', saveAudioSettings);
        settingsControls[j].addEventListener('change', saveAudioSettings);
        if (settingsControls[j].type === 'range') {
            settingsControls[j].addEventListener('input', updateSliderPercentages);
            settingsControls[j].addEventListener('change', updateSliderPercentages);
        }
    }
    var resetEffectsButton = document.getElementById('btnResetEq');
    if (resetEffectsButton) {
        resetEffectsButton.addEventListener('click', resetAudioEffects);
    }

    if (DOM.colorModeSelect) {
        DOM.colorModeSelect.addEventListener('change', function () {
            try {
                localStorage.setItem('drayColorMode', DOM.colorModeSelect.value);
            } catch (e) {}
            updateSystemThemeClass(systemThemeQuery);
        });
    }

    if (DOM.closeToTrayToggle) {
        DOM.closeToTrayToggle.addEventListener('change', function () {
            try {
                localStorage.setItem('drayCloseToTray', String(DOM.closeToTrayToggle.checked));
            } catch (e) {}
            if (window.api && window.api.setCloseToTray) {
                window.api.setCloseToTray(DOM.closeToTrayToggle.checked);
            }
        });
    }
}

function isOnline() {
    return navigator.onLine;
}

function loadOfflineSongs(callback) {
    if (!offlineDB) { if (callback) callback([]); return; }

    var tx = offlineDB.transaction(['songs'], 'readonly');
    var store = tx.objectStore('songs');
    var req = store.getAll();

    req.onsuccess = function (e) {
        var records = e.target.result || [];
        var songs = records.map(function (r) {
            var blobUrl = '';
            if (r.blob) {
                try {
                    blobUrl = URL.createObjectURL(r.blob);
                } catch (err) {
                    console.error('Blob generation error:', err);
                }
            }
            return {
                title: r.title,
                artist: r.artist,
                url: r.url,
                blobUrl: blobUrl,
                art: r.art,
                copyrighted: r.copyrighted || '',
                lyrics: r.lyrics || ''
            };
        });

        if (callback) callback(songs);
    };
}

function bootMusic() {
    openOfflineDB(function () {
        if (isOnline()) {
            loadMusic();
        } else {
            loadOfflineSongs(function (songs) {
                allSongs = songs;
                currentPlaylist = allSongs.slice(0);
                renderList(currentPlaylist);
                renderPlaylists();
                restoreLastPlayedSong();
            });
        }
    });
}

(function () {
    var menu = document.getElementById('contextMenu');
    if (!menu) return;

    var backdrop = document.createElement('div');
    backdrop.id = 'contextMenuBackdrop';
    backdrop.className = 'context-menu-backdrop';
    menu.parentNode.insertBefore(backdrop, menu);

    function closeMenuAnimation() {
        menu.classList.remove('show');
        var renameMenu = document.getElementById('renamePlaylistMenu');
        if (renameMenu) {
            renameMenu.classList.remove('show');
            renameMenu.style.display = 'none';
        }
        var createMenu = document.getElementById('createPlaylistMenu');
        if (createMenu) {
            createMenu.classList.remove('show');
            createMenu.style.display = 'none';
        }
        backdrop.classList.remove('show');
    }

    backdrop.addEventListener('click', closeMenuAnimation);
    window.addEventListener('resize', closeMenuAnimation);

    var observer = new MutationObserver(function () {
        var activeSubmenu = document.querySelector('.context-submenu.show');
        if (activeSubmenu) {
            menu.style.display = '';
            menu.classList.remove('show');
            backdrop.classList.add('show');
            return;
        }
        if (menu.style.display && menu.style.display !== 'none') {
            menu.style.display = '';
            menu.classList.add('show');
            backdrop.classList.add('show');
        } else if (menu.style.display === 'none') {
            menu.style.display = '';
            closeMenuAnimation();
        }
    });

    observer.observe(menu, { attributes: true, attributeFilter: ['style'] });
})();

restoreAudioSettings();
updateAllRangeFills();
restoreSidebarState();
renderSidebarPlaylists();
goToPage(0);
bindEvents();
bindLyricsEvents();
setPlayerControlsDisabled(document.body.classList.contains('no-song'));
updateMediaSession(null);
bootMusic();