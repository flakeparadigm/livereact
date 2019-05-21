// fire emojis
const { ipcRenderer: ipc } = require('electron');
const emojiContainerEl = document.getElementById('emojiContainer');

const displayTime = 3000

ipc.on('show-reaction', (event, reaction) => {
    console.log(reaction);
    const emojiEl = document.createElement('span');
    const getRandom = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

    emojiEl.classList.add('emoji');
    emojiEl.innerText= reaction.content;
    emojiEl.style.top = getRandom(15, 75)+'%';
    emojiEl.style.left = 100;

    emojiContainerEl.appendChild(emojiEl);

    setTimeout(() => {
        emojiEl.remove();
    }, displayTime)
});
