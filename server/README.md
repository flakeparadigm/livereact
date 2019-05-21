# Live-React Web-socket / API server

This subdirectory contains everything needed to run the web/web-socket server
to route reactions via a public web API to web-socket clients.

## Installation

Make sure you are in the `server` directory first.

```sh
cd server
npm install
```

## Usage

Fire up the server:

```sh
node index.js
```

### Web-socket Clients

An example of how to connect (using nodejs and socket.io):

```js
const webSocketClient = ioclient.connect("ws://learnosity-livereact.herokuapp:80");
webSocketClient.on("reaction", (msg) => console.info(msg));
```

### Reactions Web API

The following public endpoints are available:

#### POST `/react`

* Content-Type: application/json

Allows posting custom reaction messages to be consumed by web-socket clients.

**Sample data format**: [specs/messages/reaction.json](../specs/messages/reaction.json)
