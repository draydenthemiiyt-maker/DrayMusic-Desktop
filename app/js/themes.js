// © DraydenYT 2026

(function () {
    var LINK_ID = 'themeStylesheet';
    var STORAGE_ID = 'drayTheme';
    var STORAGE_HREF = 'drayThemeHref';
    var DEFAULT_THEME_ID = 'builtin:default02';

    var THEME_VARS = [
        '--accent', '--text', '--text-dim', '--placeholder-text',
        '--background', '--background-hover-and-border', '--panel-bg'
    ];
    var DEFAULT_COLORS = {
        dark: {
            '--accent': '#00a0ff', '--text': '#ffffff', '--text-dim': '#999999',
            '--placeholder-text': '#bfbfbf', '--background': '#202020',
            '--background-hover-and-border': '#404040', '--panel-bg': '#101010'
        },
        light: {
            '--accent': '#00a0ff', '--text': '#000000', '--text-dim': '#666666',
            '--placeholder-text': '#404040', '--background': '#dfdfdf',
            '--background-hover-and-border': '#bfbfbf', '--panel-bg': '#efefef'
        }
    };

    var PREVIEW_MARKUP =
        '<div class="tp-titlebar"><i class="tp-dot"></i><i class="tp-search"></i></div>' +
        '<div class="tp-body">' +
            '<div class="tp-sidebar"><i class="tp-nav active"></i><i class="tp-nav"></i><i class="tp-nav"></i></div>' +
            '<div class="tp-main">' +
                '<div class="tp-row"><i class="tp-art"></i><span class="tp-lines"><b></b><b></b></span></div>' +
                '<div class="tp-row"><i class="tp-art"></i><span class="tp-lines"><b></b><b></b></span></div>' +
                '<div class="tp-row"><i class="tp-art"></i><span class="tp-lines"><b></b><b></b></span></div>' +
            '</div>' +
        '</div>' +
        '<div class="tp-player"><i class="tp-art"></i><span class="tp-seek"><i></i></span><i class="tp-play"></i></div>';

    var grid = document.getElementById('themesGrid');
    var hint = document.getElementById('themesHint');
    var folderButton = document.getElementById('btnOpenThemesFolder');

    var themes = [];
    var cards = {};
    var listSignature = '';
    var activeId = readStorage(STORAGE_ID);     // the theme that is really applied right now
    var activeHref = readStorage(STORAGE_HREF); // (main.html already put its stylesheet in the link)
    var pendingLink = null;

    function readStorage(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    function writeStorage(key, value) {
        try { localStorage.setItem(key, value); } catch (e) {}
    }

    function hasThemeApi() {
        return !!(window.api && typeof window.api.getThemes === 'function');
    }

    function currentMode() {
        return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    function parseThemeVars(cssText) {
        var result = { base: {}, dark: {}, light: {} };
        if (!cssText) return result;

        var sheet;
        try {
            sheet = new CSSStyleSheet();
            sheet.replaceSync(cssText);
        } catch (e) {
            return result;
        }

        for (var i = 0; i < sheet.cssRules.length; i++) {
            var rule = sheet.cssRules[i];
            if (!rule.selectorText || !rule.style) continue;

            var selectors = rule.selectorText.split(',');
            for (var s = 0; s < selectors.length; s++) {
                var selector = selectors[s].trim().toLowerCase();
                var bucket = null;
                if (selector === 'html' || selector === ':root') bucket = 'base';
                else if (selector === 'html.dark' || selector === ':root.dark') bucket = 'dark';
                else if (selector === 'html.light' || selector === ':root.light') bucket = 'light';
                if (!bucket) continue;

                for (var p = 0; p < rule.style.length; p++) {
                    var prop = rule.style[p];
                    if (prop.indexOf('--') === 0) {
                        result[bucket][prop] = rule.style.getPropertyValue(prop).trim();
                    }
                }
            }
        }
        return result;
    }

    function resolveThemeColors(theme, mode) {
        var parsed = theme.parsed || { base: {}, dark: {}, light: {} };
        var colors = {};
        for (var i = 0; i < THEME_VARS.length; i++) {
            var name = THEME_VARS[i];
            var value = parsed[mode][name];
            if (!value && name === '--accent') value = parsed.base[name];
            colors[name] = value || DEFAULT_COLORS[mode][name];
        }
        return colors;
    }

    function setPreviewColors(entry) {
        var colors = resolveThemeColors(entry.theme, currentMode());
        for (var i = 0; i < THEME_VARS.length; i++) {
            entry.preview.style.setProperty('--tp-' + THEME_VARS[i].slice(2), colors[THEME_VARS[i]]);
        }
    }

    function updateAllPreviewColors() {
        for (var id in cards) {
            if (Object.prototype.hasOwnProperty.call(cards, id)) setPreviewColors(cards[id]);
        }
    }

    function buildCard(theme) {
        var card = el('button', 'theme-card');
        card.type = 'button';
        card.setAttribute('data-theme-id', theme.id);
        if (theme.description) card.title = theme.description;

        var preview = el('div', 'theme-preview');
        var entry = { card: card, preview: preview, theme: theme };

        if (theme.preview) {
            var img = document.createElement('img');
            img.alt = '';
            img.draggable = false;
            img.onerror = function () {
                if (img.parentNode) img.parentNode.removeChild(img);
                preview.innerHTML = PREVIEW_MARKUP;
                setPreviewColors(entry);
            };
            img.src = theme.preview;
            preview.appendChild(img);
        } else {
            preview.innerHTML = PREVIEW_MARKUP;
        }

        var info = el('div', 'theme-info');
        info.appendChild(el('span', 'theme-name', theme.name));
        info.appendChild(el('span', 'theme-author', 'by ' + theme.author));

        card.appendChild(preview);
        card.appendChild(el('span', 'theme-check material-symbols-rounded', 'check_circle'));
        card.appendChild(info);
        card.addEventListener('click', function () { applyTheme(theme); });

        cards[theme.id] = entry;
        setPreviewColors(entry);
        return card;
    }

    function showMessage(text) {
        if (!grid) return;
        grid.innerHTML = '';
        cards = {};
        listSignature = '';
        grid.appendChild(el('p', 'themes-message', text));
    }

    function renderGrid() {
        if (!grid) return;

        var signature = themes.map(function (t) {
            return [t.id, t.name, t.author, t.href, t.preview || '', t.description].join('|');
        }).join('\n');
        if (signature === listSignature && grid.children.length) {
            updateSelection();
            return;
        }
        listSignature = signature;

        grid.innerHTML = '';
        cards = {};
        if (!themes.length) {
            grid.appendChild(el('p', 'themes-message', 'No themes found.'));
            return;
        }
        for (var i = 0; i < themes.length; i++) grid.appendChild(buildCard(themes[i]));
        updateSelection();
    }

    function updateSelection() {
        for (var id in cards) {
            if (!Object.prototype.hasOwnProperty.call(cards, id)) continue;
            var selected = id === activeId;
            cards[id].card.classList.toggle('selected', selected);
            cards[id].card.setAttribute('aria-pressed', String(selected));
        }
    }

    function applyTheme(theme) {
        if (!theme) return;
        if (theme.id === activeId && theme.href === activeHref) {
            updateSelection();
            return;
        }

        if (pendingLink && pendingLink.parentNode) pendingLink.parentNode.removeChild(pendingLink);

        var oldLink = document.getElementById(LINK_ID);
        var newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        pendingLink = newLink;

        newLink.onload = function () {
            newLink.onload = newLink.onerror = null;
            if (pendingLink === newLink) pendingLink = null;
            if (oldLink && oldLink.parentNode) oldLink.parentNode.removeChild(oldLink);
            newLink.id = LINK_ID;

            activeId = theme.id;
            activeHref = theme.href;
            writeStorage(STORAGE_ID, theme.id);
            writeStorage(STORAGE_HREF, theme.href);
            updateSelection();
        };
        newLink.onerror = function () {
            console.warn('Could not load theme stylesheet', theme.href);
            newLink.onload = newLink.onerror = null;
            if (newLink.parentNode) newLink.parentNode.removeChild(newLink);
            if (pendingLink === newLink) pendingLink = null;
            updateSelection();
        };

        newLink.href = theme.href;
        if (oldLink && oldLink.parentNode) oldLink.parentNode.insertBefore(newLink, oldLink.nextSibling);
        else document.head.appendChild(newLink);
    }

    function findTheme(id) {
        for (var i = 0; i < themes.length; i++) {
            if (themes[i].id === id) return themes[i];
        }
        return null;
    }

    function reconcileSelection() {
        if (!themes.length) return;
        // Falls back to the default theme if the saved one was removed from the folder
        applyTheme(findTheme(activeId) || findTheme(DEFAULT_THEME_ID) || themes[0]);
    }

    function refresh() {
        if (!hasThemeApi()) {
            showMessage('Themes are only available in the DrayMusic desktop app.');
            return Promise.resolve();
        }

        return window.api.getThemes().then(function (result) {
            themes = ((result && result.themes) || []).map(function (theme) {
                theme.parsed = parseThemeVars(theme.css);
                delete theme.css;
                return theme;
            });
            if (hint && result && result.userThemesDir) {
                hint.textContent = 'Want more? Put theme folders in ' + result.userThemesDir + ' and they show up here.';
            }
            renderGrid();
            reconcileSelection();
        }).catch(function (err) {
            console.error('Could not load themes', err);
            showMessage('Could not load themes.');
        });
    }

    if (folderButton) {
        folderButton.addEventListener('click', function () {
            if (window.api && typeof window.api.openThemesFolder === 'function') window.api.openThemesFolder();
        });
    }

    if (window.MutationObserver) {
        new MutationObserver(updateAllPreviewColors).observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    window.addEventListener('focus', function () {
        var settingsPage = document.getElementById('equalizerPage');
        if (settingsPage && settingsPage.classList.contains('active')) refresh();
    });

    window.DrayThemes = { refresh: refresh };
    refresh();
})();
