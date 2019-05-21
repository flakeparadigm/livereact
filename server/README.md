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

* Accept: `application/json`
* Content-Type: `application/json`

Allows posting custom reaction messages to be consumed by web-socket clients.

**Sample request data format**: [specs/post-react.json](../specs/post-react.json)

**Sample response**:
```json
{
    "status": "OK"
}
```

#### POST `/room-exists`

* Accept: `application/json`
* Content-Type: `application/json`

Provides a simple yes/no test for whether a particular room name exists on the server.

If the response states that a given room name exists, then there is an active connection using that room name, meaning
* a client is accepting reaction events and
* it is not possible to create a new connection with that room name (until that room name is relinquished).

**Sample request data format**: [specs/post-room-exists.json](../specs/post-room-exists.json)

**Sample response**:
```json
{
    "exists": true
}
```
