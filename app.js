let currentState = 's';
let timerState = 'pomodoro';
let intervalID;
let occ = 1;
let rangeTolbreak = parseInt(document.querySelector('.range-lbr').value) || 4;

let pmuhrs = '00'; //pomodoro user hours
let pmumins = '25';
let pmusecs = '00';
let sbruhrs = '00'; //short break user hours
let sbrumins = '05';
let sbrusecs = '00';
let lbruhrs = '00'; //long break user hours
let lbrumins = '15';
let lbrusecs = '00';

document.querySelector('.upmh').value = '00';
document.querySelector('.upmm').value = '25';
document.querySelector('.upms').value = '00';

document.querySelector('.usbrh').value = '00';
document.querySelector('.usbrm').value = '05';
document.querySelector('.usbrs').value = '00';

document.querySelector('.ulbrh').value = '00';
document.querySelector('.ulbrm').value = '15';
document.querySelector('.ulbrs').value = '00';

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
        occ = 1;
        changeTime();
    }
});
let sbbtn = document.querySelector('.sbreak-time');
sbbtn.addEventListener('click', () => {
    if (currentState === 's') {
        timerState = 'sbreak';
        occ = 1;
        changeTime();
    }
});
let lbbtn = document.querySelector('.lbreak-time');
lbbtn.addEventListener('click', () => {
    if (currentState === 's') {
        timerState = 'lbreak';
        occ = 1;
        changeTime();
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
                //play sound
                if (timerState === 'pomodoro' && occ < rangeTolbreak) {
                    occ++;
                    timerState = 'sbreak';
                    changeTime();
                } else if (timerState === 'sbreak') {
                    timerState = 'pomodoro';
                    changeTime();
                } else if (timerState === 'pomodoro' && occ === rangeTolbreak) {
                    occ = 1;
                    timerState = 'lbreak';
                    changeTime();
                } else if (timerState === 'lbreak') {
                    occ = 1;
                    timerState = 'pomodoro';
                    changeTime();
                }
                // seconds.innerHTML = '00';
                // minutes.innerHTML = '00';
                // hours.innerHTML = '00';
                // stopTimer(intervalID);
                // return;
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
        changeTime();
    }
}
function changeTime() {
    switch (timerState) {
        case 'pomodoro':
            hours.innerHTML = pmuhrs;
            minutes.innerHTML = pmumins;
            seconds.innerHTML = pmusecs;
            break;
        case 'sbreak':
            hours.innerHTML = sbruhrs;
            minutes.innerHTML = sbrumins;
            seconds.innerHTML = sbrusecs;
            break;
        case 'lbreak':
            hours.innerHTML = lbruhrs;
            minutes.innerHTML = lbrumins;
            seconds.innerHTML = lbrusecs;
            break;
    }
}

let settingsBtn = document.querySelector('.settings-btn');
settingsBtn.addEventListener('click', () => {
    let settings = document.querySelector('.settings-container');
    settings.classList.toggle('show');
});
let rsettingsBtn = document.querySelector('.remove-settings-btn');
rsettingsBtn.addEventListener('click', () => {
    let settings = document.querySelector('.settings-container');
    settings.classList.toggle('show');
});

document.querySelector('.save-settings').addEventListener('click', () => {
    rangeTolbreak = parseInt(document.querySelector('.range-lbr').value) || 4;

    pmuhrs = document.querySelector('.upmh').value || '00';
    pmumins = document.querySelector('.upmm').value || '25';
    pmusecs = document.querySelector('.upms').value || '00';

    sbruhrs = document.querySelector('.usbrh').value || '00';
    sbrumins = document.querySelector('.usbrm').value || '05';
    sbrusecs = document.querySelector('.usbrs').value || '00';

    lbruhrs = document.querySelector('.ulbrh').value || '00';
    lbrumins = document.querySelector('.ulbrm').value || '15';
    lbrusecs = document.querySelector('.ulbrs').value || '00';

    changeTime();

    let settings = document.querySelector('.settings-container');
    settings.classList.toggle('show');
});

document.querySelector('.reset-settings').addEventListener('click', () => {
    rangeTolbreak = 4;

    pmuhrs = '00';
    pmumins = '25';
    pmusecs = '00';

    sbruhrs = '00';
    sbrumins = '05';
    sbrusecs = '00';

    lbruhrs = '00';
    lbrumins = '15';
    lbrusecs = '00';

    changeTime();
});