const express = require('express');
const bodyParser = require('body-parser');
const ioclient = require("socket.io-client");



// -------------------------------------------

// SERVER-SIDE (Routing reactions from endpoint to websockets)


// WEB-SOCKET server initialisation
// For managing websocket configuration, connections, lifecycle etc.
const
    io = require("socket.io"),
    server = io.listen(8800);

let
    clientConnections = new Map();

server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    clientConnections.set(socket, socket.id);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        clientConnections.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});


// WEB-APP server initialisation
// For exposing endpoints that clients can send reactions to
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/react', (req, res) => {
    for (const [client] of clientConnections.entries()) {
        client.emit("reaction", req.body);
    }
    // Send a meaningful response payload
    res.json({ status: 'OK' });
});

app.listen(3000, () => console.log('server started'));



// -------------------------------------------

// CLIENT-SIDE (listening for reaction events)


// WEB-SOCKET client connection
// const electronApp = ioclient.connect("ws://10.20.8.171:8800");
// electronApp.on("reaction", (msg) => console.info(msg));
