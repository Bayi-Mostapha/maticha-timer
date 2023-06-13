setInterval(() => {
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

