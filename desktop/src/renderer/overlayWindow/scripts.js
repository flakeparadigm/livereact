// fire emojis
const { ipcRenderer: ipc } = require('electron');
const emojiContainerEl = document.getElementById('emojiContainer');

const displayTime = 2100;
const emojiSize = 100;
const animations = ['animation-up-lr', 'animation-up-rl'];

ipc.on('show-reaction', createEmoji);

function createEmoji(_, reaction) {
    if (!reaction || !reaction.content) {
        return;
    }

    const emojiEl = document.createElement('span');
    const maxHorizontal = emojiContainerEl.getBoundingClientRect().width - emojiSize;
    const maxVertical = 15;
    const getRandom = (min, max) => Math.floor(
        Math.random() * (max - min + 1) + min
    );

    emojiEl.classList.add('emoji');
    emojiEl.classList.add(animations[getRandom(0, animations.length - 1)]);
    emojiEl.innerText= reaction.content;

    emojiEl.style.left = `${getRandom(0, maxHorizontal)}px`;
    emojiEl.style.bottom = `${getRandom(1, maxVertical)}%`;

    emojiContainerEl.appendChild(emojiEl);

    setTimeout(() => {
        emojiEl.remove();
    }, displayTime)
}
