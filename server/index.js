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
const io = require('socket.io');
const EVENTS = require('../events');

const app = express();
const webServer = http.createServer(app);
const socketServer = io(webServer);

/*--------------------------------------------------------------------------
 * WEB-SOCKET SERVER INITIALIZATION
 *
 * For managing web-socket configuration, connections, lifecycle etc.
 *
 * EVENTS RECEIVED:
 * EVENTS.CREATE_ROOM, { roomName: name of the room to create }
 *
 * EVENTS SENT:
 * EVENTS.CREATE_ROOM, {
 *     roomName: same as above,
 *     created: boolean for if it was created successfully,
 *     message: any debugging message
 * }
 * EVENTS.REACTION, { /specs/post-react.reaction }
 * '
 */
const roomBySocketId = {};
const rooms = {};

socketServer.on(EVENTS.CONNECTION, (socket) => {
    console.info(`Client connected [id=${socket.id}]`);

    socket.once(EVENTS.CREATE_ROOM, ({ roomName }) => {
        const response = { roomName, created: false }
        roomName = roomName.toLowerCase();

        if (!/^[a-z0-9_\-]+$/.test(roomName)) {
            response.message = 'Room name invalid';
        } else if (!rooms[roomName]) {
            rooms[roomName] = socket;
            roomBySocketId[socket.id] = roomName;
            response.created = true;
        } else {
            response.message = 'Room not available';
        }

        console.log('Room creation:', response);

        socket.emit(EVENTS.CREATE_ROOM, response);
    });

    socket.on(EVENTS.DISCONNECT, () => {
        const room = roomBySocketId[socket.id];

        delete rooms[room];
        delete roomBySocketId[socket.id];

        console.info(`Client gone [id=${socket.id}], Room "${room}" closed`);
    });
});

/*--------------------------------------------------------------------------
 * WEB-APP SERVER INITIALIZATION
 *
 * For exposing API endpoints that clients can send reactions to.
 */
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/react', (req, res) => {
    const { roomName, reaction } = req.body;
    const room = rooms[roomName.toLowerCase()];

    if (room) {
        room.emit(EVENTS.REACTION, reaction);
        res.json({ status: 'OK' });
    } else {
        res.status(404).json({ status: 'Room not found' });
    }
});

app.post('/room-exists', (req, res) => {
    const exists = !!rooms[req.body.roomName.toLowerCase()];

    res.status(exists ? 200 : 404)
        .json({ exists });
});

webServer.listen(process.env.PORT || 3000, () => console.log('server started'));
