const arrow = document.querySelector(`.arrow`);
const startBtn = document.querySelector(`.start`);
const bpmInput = document.getElementById(`.bpm`);
const stopBtn = document.querySelector(`.stop`);
const listenerBtn = document.querySelector(`.listener`);
let calk;
let startPosition = 0;
let intervalID;
let audio = document.querySelector(".audio");
audio.preload;
let work = false;

listenerBtn.addEventListener("click", listener);

let firstClick;
const dateArr = [];
let count = 0;

function listener() {
if(work === false){
  if (count < 12){
  let date = new Date();
  dateArr.push(date)
    count++;
  }
  else {
    let tempCalk = 0;
    for (let index = 0; index < dateArr.length-1; index++) {
      tempCalk = tempCalk + (dateArr[index + 1] - dateArr[index]);
    }
    calk = (tempCalk / dateArr.length - 1);
    startMetronome(calk);
    dateArr.length = 0;
    tempCalk = 0;
    count = 0;
    work = true;
    }
  } 
}


stopBtn.addEventListener("click", () => {
  clearInterval(intervalID);
  work = false;
});

startBtn.addEventListener("click", calculateInterval);

function soundAndArrow() {
  audio.play();
  if (startPosition == 0) {
    startPosition = 90;

    animate({
      duration: calk,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        arrow.style.left = progress * startPosition + "%";
      },
    });
    console.log(1);
  } else {
    animate({
      duration: calk,
      timing(timeFraction) {
        return timeFraction;
      },
      draw(progress) {
        arrow.style.left = 90 - 90 * progress + "%";
      },
    });
    startPosition = 0;
  }
}

function calculateInterval() {
  let input = document.getElementById(`bpm`);
  input = input.value;
  work = true;
  if (input > 0){ clearInterval(intervalID);
  let beep = input / 60;
  calk = 1000 / beep;
  console.log(`${calk}`);
    console.log(calk);
    startMetronome(calk);
  }
}

function startMetronome(interval) {
  intervalID = setInterval(soundAndArrow, interval);
}

function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать её

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}