const { BrowserWindow } = require('electron')
const path = require('path');

class OverlayWindow extends BrowserWindow {
    constructor(options) {
        const defaultOptions = {
            frame: false,
            transparent: true,
            webPreferences: {
                nodeIntegration: true
            },
            hasShadow: false
          };

        super(Object.assign(defaultOptions, options));

        this.loadFile(path.join(__dirname, '../renderers/overlayWindow/index.html'));
    }
}

function createOverlayWindow() {
    return new OverlayWindow();
}

module.exports = {
    createOverlayWindow
};
