const emojis = [
    '😀','😁','😂','🤣','😃','😄',
    '😅','😆','😉','😊','😋','😎',
    '😍','😘','🥰','😗','😙','😚',
    '🙂','🤗','🤩','🤔','🤨','😐',
    '😑','😶','🙄','😏','😣','😥',
    '😮','🤐','😯','😪','😫','😴',
    '😌','😛','😜','😝','🤤','😒',
    '😓','😔','😕','🙃','🤑','😲',
    '🙁','😖','😞','😟','😤','😢',
    '😭','😦','😧','😨','😩','🤯',
    '😬','😰','😱','🥵','🥶','😳',
    '🤪','😵','😡','😠','🤬','😷',
    '🤒','🤕','🤢','🤮','🤧','😇',
    '🤠','🤡','🥳','🥴','🥺','🤥',
    '🤫','🤭','🧐','🤓','😈','👿',
    '👹','👺','💀','👻','👽','🤖',
    '💩','😺','😸','😹','😻','😼',
    '😽','🙀','😿','😾'
];

const container = document.getElementById('emoji-container');

const sendRequest = (emoji) => {
    console.log('Sending', emoji);

    let data = JSON.stringify({
        content: emoji
    });

    const axiosConfig = {
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };
    const hostUrl = 'https://learnosity-livereact.herokuapp.com';
    const endpoint = '/react';

    axios.post(`${hostUrl}${endpoint}`, data, axiosConfig)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
};

emojis.forEach(emoji => {
    let button = document.createElement('button');

    button.className = 'button emoji';
    button.innerText = emoji;
    container.appendChild(button);

    button.addEventListener('click', () => {
        sendRequest(emoji);
    });
});
