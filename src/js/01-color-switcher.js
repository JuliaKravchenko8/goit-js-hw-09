function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId = null;

// startBtn.addEventListener('click', onStartClick);
// stopBtn.addEventListener('click', onStopClick);

refs.startBtn.addEventListener('click', () => {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    refs.startBtn.disabled = true;
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  refs.startBtn.disabled = false;
});
