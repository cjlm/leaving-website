// support different ideas of hidden / visible across browsers
let hidden;
let visibilityChange;
if (typeof document.hidden !== 'undefined') {
  hidden = 'hidden';
  visibilityChange = 'visibilitychange';
} else if (typeof document.msHidden !== 'undefined') {
  hidden = 'msHidden';
  visibilityChange = 'msvisibilitychange';
} else if (typeof document.webkitHidden !== 'undefined') {
  hidden = 'webkitHidden';
  visibilityChange = 'webkitvisibilitychange';
}

let socket;
let entered = false;
let count = undefined;

const startSocket = () => {
  socket = io();
  socket.connect();

  socket.on('connect', () => {
    socket.on('count', onCount);
  });

  socket.on('reconnect', () => {
    socket.on('count', onCount);
  });
};

const splashScreen = document.querySelector('.splash');
splashScreen.addEventListener('click', () => {
  splashScreen.style.opacity = 0;
  setTimeout(() => {
    splashScreen.classList.add('hidden');
  }, 610);
  entered = true;
  backgroundAnimation();
  startSocket();
});

const updateCount = (count) => {
  const countTag = document.getElementById('count');
  let text;
  switch (count) {
    case 0:
      text = 'Nobody else is';
      break;
    case 1:
      text = 'You are the only person';
      break;
    case 2:
      text = `One other person is`;
      break;
    default:
      text = `${numToWords(count - 1)} others are`;
      break;
  }
  countTag.innerText = `${text} here`.trim().toLowerCase();
};

const sound = new Howl({
  src: ['door.wav'],
});

const onCount = (newCount) => {
  count = count || newCount;

  if (newCount < count) {
    sound.play();
  }

  count = newCount;

  updateCount(count);
};

function handleVisibilityChange() {
  if (entered) {
    if (document[hidden]) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === 'undefined' || hidden === undefined) {
  console.log(
    'This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.'
  );
} else {
  // Handle page visibility change
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
