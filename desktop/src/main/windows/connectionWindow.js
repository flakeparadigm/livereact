const { BrowserWindow } = require('electron')
const path = require('path');

class ConnectionWindow extends BrowserWindow {
    constructor(options) {
        const defaultOptions = {
            width: 450,
            height: 250,
            show: false,
            webPreferences: {
                nodeIntegration: true
            }
          };

        super(Object.assign(defaultOptions, options));

        this.loadFile(path.join(__dirname, '../../renderer/connectionWindow/index.html'));
    }
}

function createConnectionWindow() {
    return new ConnectionWindow();
}

module.exports = {
    createConnectionWindow
};
