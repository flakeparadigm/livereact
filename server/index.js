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
const ioclient = require('socket.io-client');
const io = require('socket.io');

/*--------------------------------------------------------------------------
 * WEB-SOCKET SERVER INITIALIZATION
 *
 * For managing web-socket configuration, connections, lifecycle etc.
 */
const server = io.listen(process.env.PORT || 8800);
const clientConnections = new Map();

server.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    clientConnections.set(socket, socket.id);

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
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/react', (req, res) => {
    for (const [client] of clientConnections.entries()) {
        client.emit('reaction', req.body);
    }
    // Send a meaningful response payload
    res.json({ status: 'OK' });
});

app.listen(process.env.PORT || 3000, () => console.log('server started'));
