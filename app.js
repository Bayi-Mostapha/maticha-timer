let currentState = 's';
let timerState = 'pomodoro';
let intervalID;

let startBtn = document.querySelector('.start');
startBtn.addEventListener('click', countdown);

let seconds = document.querySelector('.seconds');
let minutes = document.querySelector('.minutes');
let hours = document.querySelector('.hours');

let btn = document.querySelectorAll('.btn');

let pmbtn = document.querySelector('.pomodoro-time');
pmbtn.addEventListener('click', () => {
    if (currentState === 's') {
        timerState = 'pomodoro';
        seconds.innerHTML = '00';
        minutes.innerHTML = '25';
    }
});
let sbbtn = document.querySelector('.sbreak-time');
sbbtn.addEventListener('click', () => {
    if (currentState === 's') {
        timerState = 'sbreak';
        seconds.innerHTML = '00';
        minutes.innerHTML = '05';
    }
});
let lbbtn = document.querySelector('.lbreak-time');
lbbtn.addEventListener('click', () => {
    if (currentState === 's') {
        timerState = 'lbreak';
        seconds.innerHTML = '00';
        minutes.innerHTML = '15';
    }
});
function countdown() {
    for (let i = 0; i < btn.length; i++) {
        btn[i].classList.toggle('unclick');
    }
    if (currentState === 's') {
        startBtn.innerHTML = 'Stop timer';
        startBtn.classList.toggle('stop');
        currentState = 'r';
        intervalID = setInterval(() => {
            let seconds = document.querySelector('.seconds');
            let nsecs = parseInt(seconds.innerHTML);
            let minutes = document.querySelector('.minutes');
            let nmins = parseInt(minutes.innerHTML);
            let hours = document.querySelector('.hours');
            let nhrs = parseInt(hours.innerHTML);
            if (nsecs === 0 && nmins === 0 && nhrs === 0) {
                seconds.innerHTML = '00';
                minutes.innerHTML = '00';
                hours.innerHTML = '00';
                stopTimer(intervalID);
                return;
            }
            if (nsecs > 0) {
                nsecs--;
                if (nsecs.toString().length === 1)
                    seconds.innerHTML = '0' + nsecs;
                else
                    seconds.innerHTML = nsecs;
            } else if (nsecs === 0) {
                if (nmins > 0) {
                    seconds.innerHTML = 59;
                    nmins--;
                    if (nmins.toString().length === 1)
                        minutes.innerHTML = '0' + nmins;
                    else
                        minutes.innerHTML = nmins;
                }
                else if (nmins === 0) {
                    if (nhrs > 0) {
                        minutes.innerHTML = 59;
                        seconds.innerHTML = 59;
                        nhrs--;
                        if (nhrs.toString().length === 1)
                            hours.innerHTML = '0' + nhrs;
                        else
                            hours.innerHTML = nhrs;
                    }
                }
            }
        }, 1000);
    } else if (currentState === 'r') {
        currentState = 's';
        startBtn.innerHTML = 'Start timer';
        startBtn.classList.toggle('stop');
        stopTimer(intervalID);
    }
}

function stopTimer(intervalID) {
    clearInterval(intervalID);
}

let resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', resetTimer);

function resetTimer() {
    if (currentState === 's') {
        switch (timerState) {
            case 'pomodoro':
                hours.innerHTML = '00';
                minutes.innerHTML = '25';
                seconds.innerHTML = '00';
                break;
            case 'sbreak':
                hours.innerHTML = '00';
                minutes.innerHTML = '05';
                seconds.innerHTML = '00';
                break;
            case 'lbreak':
                hours.innerHTML = '00';
                minutes.innerHTML = '15';
                seconds.innerHTML = '00';
                break;
        }
    }
}
