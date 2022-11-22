import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timeValues: document.querySelectorAll('.value'),
  startBtn: document.querySelector('button[data-start]'),
};

let ms = 0;
let currentTime = null;
let setTime = null;
let intervalId = null;
const daysElem = document.querySelector('span[data-days]');
const hoursElem = document.querySelector('span[data-hours]');
const minutesElem = document.querySelector('span[data-minutes]');
const secondsElem = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    setTime = selectedDates[0];
    currentTime = Date.now;

    if (options.defaultDate.getTime() > selectedDates[0].getTime()) {
      Notify.failure('Please chose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

refs.startBtn.addEventListener('click', onStartClick);
refs.startBtn.disabled = true;

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function onStartClick() {
  intervalId = setInterval(() => {
    currentTime = Date.now();
    ms = setTime - currentTime;
    let time = convertMs(ms);
    daysElem.textContent = time.days;
    hoursElem.textContent = time.hours;
    minutesElem.textContent = time.minutes;
    secondsElem.textContent = time.seconds;
    // console.log(ms);
    if (ms < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
