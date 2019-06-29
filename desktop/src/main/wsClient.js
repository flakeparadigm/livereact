const io = require('socket.io-client');
const resources = require('../common/resources');
const EVENTS = resources.require('events.json');

class WsClient {
    constructor(host, port=80) {
        this.host = `ws://${host}:${port}`;
        this.socket = null;
    }

    connect() {
        if (this.socket && this.socket.connected) return Promise.resolve(this.socket);

        return new Promise((resolve, reject) => {
            console.log(`Connecting to server: ${this.host}`);
            this.socket = io.connect(this.host);

            this.socket.once(EVENTS.CONNECT, () => {
                console.log('connected');
                this.socket.off(EVENTS.CONNECT_ERROR);
                resolve(this.socket)
            });

            this.socket.once(EVENTS.CONNECT_ERROR, (error) => {
                console.log('error', error.toString());
                this.socket.off(EVENTS.CONNECT);
                this.socket.close();
                this.socket = null;
                reject(error);
            });
        });
    }

    createRoom(roomName) {
        return this.connect()
            .then((socket) => new Promise((resolve, reject) => {
                socket.once(EVENTS.CREATE_ROOM, ({ created, message }) => {
                    if (created) {
                        resolve(socket);
                    } else {
                        this.close();
                        reject(`Could not create room: ${message}`);
                    }
                });

                socket.emit(EVENTS.CREATE_ROOM, { roomName });
            }));
    }

    close() {
        this.socket.close();
        this.socket = null;
    }
}

module.exports = {
    WsClient
};
