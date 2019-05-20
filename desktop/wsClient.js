const io = require('socket.io-client');

class WsClient {
    constructor(host, port=8800) {
        this.host = `ws://${host}:${port}`;
        this.socket = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            console.log(`Connecting to server: ${this.host}`);
            this.socket = io.connect(this.host);

            this.socket.once('connect', () => {
                console.log('connected');
                this.socket.off('connect_error');
                resolve(this.socket)
            });

            this.socket.once('connect_error', (error) => {
                console.log('error', error.toString());
                this.socket.off('connect');
                this.socket.close();
                this.socket = null;
                reject(error);
            });
        });
    }

    close() {
        this.socket.close();
        this.socket = null;
    }
}

module.exports = {
    WsClient
};
