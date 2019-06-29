const { ipcRenderer: ipc } = require('electron');
const formEl = document.getElementById('connectForm');
const roomNameEl = document.getElementById('roomName');
const startButtonEl = document.getElementById('startButton');
const errorTextEl = document.getElementById('errorText');
const startText = startButtonEl.innerText;
let connected = false;

roomNameEl.focus();

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    startLoading();
    if (connected) {
        ipc.send('disconnect')
    } else {
        ipc.send('connect-with-details', {
            roomName: roomNameEl.value
        })
    }
});


function startLoading() {
    // cleanup other statuses
    formEl.classList.remove('error');
    formEl.classList.remove('connected');
    errorTextEl.innerText = '';

    formEl.classList.add('loading');
    roomNameEl.setAttribute('disabled', 'true');
    startButtonEl.innerText = '... ⏳';
    startButtonEl.setAttribute('disabled', 'true');
}

function handleError(_, message) {
    formEl.classList.remove('loading');
    formEl.classList.add('error');

    roomNameEl.removeAttribute('disabled');
    startButtonEl.removeAttribute('disabled');

    startButtonEl.innerText = startText;
    errorTextEl.innerText = message;
}
ipc.on('error', handleError);

function handleSuccess() {
    formEl.classList.remove('loading');
    formEl.classList.add('connected');

    startButtonEl.removeAttribute('disabled');

    startButtonEl.innerText = 'Leave 🚪';
    connected = true;
}
ipc.on('success', handleSuccess);


function handleDisconnect() {
    formEl.classList.remove('connected');
    formEl.classList.remove('loading');
    roomNameEl.removeAttribute('disabled');
    startButtonEl.removeAttribute('disabled');

    startButtonEl.innerText = startText;
    connected = false;
}
ipc.on('disconnect', handleDisconnect);
