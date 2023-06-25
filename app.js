let currentState = 's';
let timerState = 'pomodoro';
let intervalID;
let occ = 1;
let rangeTolbreak = 4;
document.querySelector('.range-lbr').value = 4;

let pmuhrs = '00'; //pomodoro user hours
let pmumins = '25';
let pmusecs = '00';
let sbruhrs = '00'; //short break user hours
let sbrumins = '05';
let sbrusecs = '00';
let lbruhrs = '00'; //long break user hours
let lbrumins = '15';
let lbrusecs = '00';
let autoStart = false;

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
startBtn.addEventListener('click', () => {
    if (autoStart) {
        countdownAuto();
    }
    else {
        countdownNoAuto();
    }
});

let seconds = document.querySelector('.seconds');
let minutes = document.querySelector('.minutes');
let hours = document.querySelector('.hours');

let warning = document.querySelector('.warning-container');
function warningShow() {
    if (currentState === 's')
        warning.classList.add('show');
}
let rwarningBtn = document.querySelector('.remove-warning');
rwarningBtn.addEventListener('click', () => {
    warning.classList.remove('show');
});

let pmbtn = document.querySelector('.pomodoro-time');
pmbtn.addEventListener('click', () => {
    if (currentState === 's') {
        timerState = 'pomodoro';
        occ = 1;
        changeTime();
    }
    else {
        warning.classList.add('show');
    }
});
let sbbtn = document.querySelector('.sbreak-time');
sbbtn.addEventListener('click', () => {
    if (currentState === 's') {
        timerState = 'sbreak';
        occ = 1;
        changeTime();
    }
    else {
        warning.classList.add('show');
    }
});
let lbbtn = document.querySelector('.lbreak-time');
lbbtn.addEventListener('click', () => {
    if (currentState === 's') {
        timerState = 'lbreak';
        occ = 1;
        changeTime();
    }
    else {
        warning.classList.add('show');
    }
});

function countdownAuto() {
    if (currentState === 's') {
        startBtn.innerHTML = 'Stop timer';
        startBtn.classList.add('stop');
        currentState = 'r';
        intervalID = setInterval(() => {
            let seconds = document.querySelector('.seconds');
            let nsecs = parseInt(seconds.innerHTML);
            let minutes = document.querySelector('.minutes');
            let nmins = parseInt(minutes.innerHTML);
            let hours = document.querySelector('.hours');
            let nhrs = parseInt(hours.innerHTML);
            if (nsecs === 0 && nmins === 0 && nhrs === 0) {
                var audio = new Audio('bell.mp3');
                audio.play();
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
        startBtn.classList.remove('stop');
        stopTimer(intervalID);
    }
}

function countdownNoAuto() {
    if (currentState === 's') {
        startBtn.innerHTML = 'Stop timer';
        startBtn.classList.add('stop');
        currentState = 'r';
        intervalID = setInterval(() => {
            let seconds = document.querySelector('.seconds');
            let nsecs = parseInt(seconds.innerHTML);
            let minutes = document.querySelector('.minutes');
            let nmins = parseInt(minutes.innerHTML);
            let hours = document.querySelector('.hours');
            let nhrs = parseInt(hours.innerHTML);
            if (nsecs === 0 && nmins === 0 && nhrs === 0) {
                var audio = new Audio('bell.mp3');
                audio.play();
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
                //auto start
                startBtn.innerHTML = 'Start timer';
                startBtn.classList.remove('stop');
                currentState = 's';
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
        startBtn.classList.remove('stop');
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
    else {
        warning.classList.add('show');
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

let settings = document.querySelector('.settings-container');
let settingsBtn = document.querySelector('.settings-btn');
settingsBtn.addEventListener('click', () => {
    if (currentState === 's')
        settings.classList.add('show');
    else {
        warning.classList.add('show');
    }
});
let rsettingsBtn = document.querySelector('.remove-settings-btn');
rsettingsBtn.addEventListener('click', () => {
    settings.classList.remove('show');
});

document.querySelector('.save-settings').addEventListener('click', () => {
    occ = 1;
    autoStart = document.querySelector('#auto-start').checked;
    let inputWarnings = document.querySelector('.input-warnings');
    let empty = document.querySelector('.empty-inputs');
    let negative = document.querySelector('.negative-time');
    let equals0 = document.querySelector('.all-times-0');
    let smalllbr = document.querySelector('.small-range-lbr');
    let flag = 0;

    inputWarnings.classList.remove('show2');
    empty.classList.remove('show2');
    negative.classList.remove('show2');
    equals0.classList.remove('show2');
    smalllbr.classList.remove('show2');

    if (document.querySelector('.range-lbr').value === '') {
        inputWarnings.classList.add('show2');
        empty.classList.add('show2');
        flag = 1;
    }
    rangeTolbreak = parseInt(document.querySelector('.range-lbr').value);
    if (rangeTolbreak < 2) {
        inputWarnings.classList.add('show2');
        smalllbr.classList.add('show2');
        flag = 1;
    }

    if (document.querySelector('.upmh').value.length === 1) {
        document.querySelector('.upmh').value = '0' + document.querySelector('.upmh').value;
    }
    pmuhrs = document.querySelector('.upmh').value;
    if (document.querySelector('.upmm').value.length === 1) {
        document.querySelector('.upmm').value = '0' + document.querySelector('.upmm').value;
    }
    pmumins = document.querySelector('.upmm').value;
    if (document.querySelector('.upms').value.length === 1) {
        document.querySelector('.upms').value = '0' + document.querySelector('.upms').value;
    }
    pmusecs = document.querySelector('.upms').value;
    if (pmuhrs === '' || pmumins === '' || pmusecs === '') {
        inputWarnings.classList.add('show2');
        empty.classList.add('show2');
        flag = 1;
    }
    if (parseInt(pmuhrs) === 0 && parseInt(pmumins) === 0 && parseInt(pmusecs) === 0) {
        inputWarnings.classList.add('show2');
        equals0.classList.add('show2');
        flag = 1;
    }


    if (document.querySelector('.usbrh').value.length === 1) {
        document.querySelector('.usbrh').value = '0' + document.querySelector('.usbrh').value;
    }
    sbruhrs = document.querySelector('.usbrh').value;
    if (document.querySelector('.usbrm').value.length === 1) {
        document.querySelector('.usbrm').value = '0' + document.querySelector('.usbrm').value;
    }
    sbrumins = document.querySelector('.usbrm').value;
    if (document.querySelector('.usbrs').value.length === 1) {
        document.querySelector('.usbrs').value = '0' + document.querySelector('.usbrs').value;
    }
    sbrusecs = document.querySelector('.usbrs').value;
    if (sbruhrs === '' || sbrumins === '' || sbrusecs === '') {
        inputWarnings.classList.add('show2');
        empty.classList.add('show2');
        flag = 1;
    }
    if (parseInt(sbruhrs) === 0 && parseInt(sbrumins) === 0 && parseInt(sbrusecs) === 0) {
        inputWarnings.classList.add('show2');
        equals0.classList.add('show2');
        flag = 1;
    }

    if (document.querySelector('.ulbrh').value.length === 1) {
        document.querySelector('.ulbrh').value = '0' + document.querySelector('.ulbrh').value;
    }
    lbruhrs = document.querySelector('.ulbrh').value;
    if (document.querySelector('.ulbrm').value.length === 1) {
        document.querySelector('.ulbrm').value = '0' + document.querySelector('.ulbrm').value;
    }
    lbrumins = document.querySelector('.ulbrm').value;
    if (document.querySelector('.ulbrs').value.length === 1) {
        document.querySelector('.ulbrs').value = '0' + document.querySelector('.ulbrs').value;
    }
    lbrusecs = document.querySelector('.ulbrs').value;
    if (lbruhrs === '' || lbrumins === '' || lbrusecs === '') {
        inputWarnings.classList.add('show2');
        empty.classList.add('show2');
        flag = 1;
    }
    if (parseInt(lbruhrs) === 0 && parseInt(lbrumins) === 0 && parseInt(lbrusecs) === 0) {
        inputWarnings.classList.add('show2');
        equals0.classList.add('show2');
        flag = 1;
    }

    if (parseInt(pmuhrs) < 0 || parseInt(pmumins) < 0 || parseInt(pmusecs) < 0 || parseInt(sbruhrs) < 0 || parseInt(sbrumins) < 0 || parseInt(sbrusecs) < 0 || parseInt(lbruhrs) < 0 || parseInt(lbrumins) < 0 || parseInt(lbrusecs) < 0) {
        inputWarnings.classList.add('show2');
        negative.classList.add('show2');
        flag = 1;
    }

    if (flag)
        return;

    inputWarnings.classList.remove('show2');
    empty.classList.remove('show2');
    negative.classList.remove('show2');
    equals0.classList.remove('show2');
    smalllbr.classList.remove('show2');
    changeTime();

    let settings = document.querySelector('.settings-container');
    settings.classList.remove('show');
});

document.querySelector('.reset-settings').addEventListener('click', () => {
    rangeTolbreak = 4;
    document.querySelector('.range-lbr').value = 4;

    pmuhrs = '00';
    pmumins = '25';
    pmusecs = '00';

    sbruhrs = '00';
    sbrumins = '05';
    sbrusecs = '00';

    lbruhrs = '00';
    lbrumins = '15';
    lbrusecs = '00';

    document.querySelector('.upmh').value = '00';
    document.querySelector('.upmm').value = '25';
    document.querySelector('.upms').value = '00';

    document.querySelector('.usbrh').value = '00';
    document.querySelector('.usbrm').value = '05';
    document.querySelector('.usbrs').value = '00';

    document.querySelector('.ulbrh').value = '00';
    document.querySelector('.ulbrm').value = '15';
    document.querySelector('.ulbrs').value = '00';

    changeTime();
});