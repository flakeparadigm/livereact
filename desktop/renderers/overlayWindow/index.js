// fire emojis
const { ipcRenderer: ipc } = require('electron');
const emojiContainerEl = document.getElementById('emojiContainer');
let nextId = 0;

const displayTime = 5000

ipc.on('show-reaction', (event, reaction) => {
    console.log(reaction);
    const emojiEl = document.createElement('span');
    emojiEl.classList.add('emoji');
    emojiEl.innerText= reaction.content;
    emojiEl.style.top = 100;
    emojiEl.style.left = 100;

    emojiContainerEl.appendChild(emojiEl);

    setTimeout(() => {
        emojiEl.remove();
    }, displayTime)
});
