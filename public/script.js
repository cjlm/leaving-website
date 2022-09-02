const socket = io();

const [p] = document.getElementsByTagName('p');
const audio = document.getElementById('audio');

const updateCount = (count) => {
  let text;
  switch (count) {
    case 0:
      text = 'Nobody else is';
      break;
    case 1:
      text = 'You are the only person';
      break;
    default:
      text = `${count - 1} others are`;
      break;
  }
  p.innerText = `${text} here`.trim();
};

let count = undefined;
let running = false;

socket.on('count', (newCount) => {
  count = count || newCount;

  if (newCount < count) {
    audio.play();
  }

  count = newCount;

  if (!running) {
    background();
    running = true;
  }
  updateCount(count);
});
