/**
 * Server/index.js
 *
 * Configures and manages web-socket server;
 * Configures and manages web server;
 * Defines routes for public web API endpoints;
 * Routes reactions from API endpoints to web-socket clients
 */

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const ioclient = require('socket.io-client');
const io = require('socket.io');

const app = express();
const webServer = http.createServer(app);
const socketServer = io(webServer);

/*--------------------------------------------------------------------------
 * WEB-SOCKET SERVER INITIALIZATION
 *
 * For managing web-socket configuration, connections, lifecycle etc.
 */
const clientConnections = new Map();

socketServer.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    clientConnections.set(socket.id, socket);

    socket.on('disconnect', () => {
        clientConnections.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

/*--------------------------------------------------------------------------
 * WEB-APP SERVER INITIALIZATION
 *
 * For exposing API endpoints that clients can send reactions to.
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/react', (req, res) => {
    clientConnections.forEach((client) => {
        client.emit("reaction", req.body);
    });
    // Send a meaningful response payload
    res.json({ status: 'OK' });
});

webServer.listen(process.env.PORT || 3000, () => console.log('server started'));
