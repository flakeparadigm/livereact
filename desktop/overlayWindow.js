const { BrowserWindow } = require('electron')

class OverlayWindow extends BrowserWindow {
    constructor(options) {
        const defaultOptions = {
            frame: false,
            transparent: true,
            webPreferences: {
                nodeIntegration: true
            }
          };

        super(Object.assign(defaultOptions, options));

        this.loadFile('./renderers/overlayWindow/index.html');
    }
}

function createOverlayWindow() {
    return new OverlayWindow();
}

module.exports = {
    createOverlayWindow
};
