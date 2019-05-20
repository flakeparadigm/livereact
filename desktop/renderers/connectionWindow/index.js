const { ipcRenderer: ipc } = require('electron');
const formEl = document.getElementById("connectForm");
const roomNameEl = document.getElementById("roomName");
const startButtonEl = document.getElementById("startButton");
const startText = startButtonEl.innerText;

roomNameEl.focus();

formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    startLoading();
    ipc.send('start-with-details', {
        roomName: roomNameEl.value
    })
});


function startLoading() {
    // formEl.classList.add('loading');
    roomNameEl.setAttribute('disabled', 'true');
    startButtonEl.innerText = '... ⏳';
    startButtonEl.setAttribute('disabled', 'true');
}


function stopLoading() {
    formEl.classList.remove('loading');
    roomNameEl.removeAttribute('disabled');
    startButtonEl.innerText = startText;
    startButtonEl.removeAttribute('disabled');
}

function handleError(event, message) {
    console.log('error', arguments);
}
ipc.on('error', handleError);

function handleSuccess(event, message) {
    console.log('success', arguments);
}
ipc.on('success', handleSuccess);
