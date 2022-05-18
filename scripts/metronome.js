const arrow = document.querySelector(`.arrow`);
const startBtn = document.querySelector(`.start`);
const bpmInput = document.getElementById(`.bpm`);
const stopBtn = document.querySelector(`.stop`);
let calk;
let startPosition = 0;
let intervalID


    
stopBtn.addEventListener("click", ()=>{clearInterval(intervalID);
});

startBtn.addEventListener("click", inteval);


function inteval(interval) {
    calkFrequency(interval);
}

function calkFrequency(interval) {
    clearInterval(intervalID);
    let beep = interval / 60;
    calk = 1000 / beep;
    console.log(`${calk}`);
    console.log(calk);
    intervalID = setInterval(moveArrow, calk);
}

function moveArrow() {
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
        console.log(1)
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

function startMetronome() {
    
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