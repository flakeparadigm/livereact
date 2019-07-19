// const emojis = [
//     '🥇', '🎉','👏','❤️','😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','🙂','🤗','🤩','😏','😮','😯','😌','😛','😜','😝','🤤','🙃','🤑','😲','😬','😰','😱','😳','🤪','😇','🤠','🤡','🤭','🤓','😈','👹','👻','👽','🤖','😺','😸','😹','😻','😼','😽','🙀', '🔥', '🍔'
// ];

const emojis = [
    '🎉', '👏', '❤️',
    '👍', '⭐️', '🙀'
];

const emojiContainer = document.getElementById('emoji-container');
const roomForm = document.getElementById('room-form');
const roomNameEl = document.getElementById('room-name');
const errorAlertEl = document.getElementById('error-message');
const errorMessageEl = document.getElementById('error-message-body');

const hostUrl = 'https://learnosity-livereact.herokuapp.com';
const axiosConfig = {
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
};

const sendRequest = (emoji) => {
    let data = JSON.stringify({
        roomName: roomNameEl.value,
        reaction: {
            content: emoji
        }
    });

    const endpoint = '/react';

    axios.post(`${hostUrl}${endpoint}`, data, axiosConfig)
        .catch((error) => {
            console.log(error);
            showError('Could not connect to room!');
            emojiContainer.classList.add('hide');
        });
};

const showError = (message, context) => {
    console.error(context || message);
    errorMessageEl.innerHTML = message;
    roomForm.classList.remove('hide');
    errorAlertEl.classList.remove('hide');
};

const hideError = () => {
    roomForm.classList.add('hide');
    errorAlertEl.classList.add('hide');
};

document.getElementById('error-message').addEventListener('click', (event) => {
    errorAlertEl.classList.add('hide');
});

document.getElementById('connect-btn').addEventListener('click', (event) => {
    if (!roomNameEl.value.length) {
        showError('Must provide a room name.');
        emojiContainer.classList.add('hide');
        return;
    }

    axios.post(`${hostUrl}/room-exists`, JSON.stringify({
        roomName: roomNameEl.value
    }), axiosConfig)
        .then((response) => {
            if (response.data.exists) {
                hideError();
                emojiContainer.classList.remove('hide');
            } else {
                showError('Room does not exist!');
                emojiContainer.classList.add('hide');
            }
        })
        .catch((error) => {
            showError('Cannot connect to room!', error);
            emojiContainer.classList.add('hide');
        });
});

emojis.forEach(emoji => {
    let button = document.createElement('button');

    button.className = 'button emoji';
    button.innerText = emoji;
    emojiContainer.appendChild(button);

    button.addEventListener('click', () => {
        sendRequest(emoji);
    });
});
