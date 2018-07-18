//////for real clock/////////////////////////////

var BGUtils = (function (theModule) {
    'use strict';

    function realClock () {
        const clockDiv = document.createElement('div');
        clockDiv.className = 'clockDiv';
        let clockSpan = document.createElement('span');
        clockSpan.className = 'clockSpan';
        document.body.appendChild(clockDiv);
        clockDiv.appendChild(clockSpan);

        clockDiv.style.textAlign = 'center';
        clockSpan.style.display = 'inline-block';
        clockSpan.style.padding = '6px';
        clockSpan.style.border = '1px solid black';
        clockSpan.style.margin = '6px';
        

        function setTime() {
            let d = new Date();
            let hours = d.getHours();
            let minutes = d.getMinutes();
            let seconds = d.getSeconds();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            clockSpan.innerHTML = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
        }

        setTime();
        setInterval(setTime, 1000);
    }
    
    theModule.realClock = realClock;

    return theModule;

}(BGUtils || {}));




////////for clock starting at 12:00 am/////////////////////////////////

(function (theModule) {
    'use strict';

    function resetClock () {
        const clockDiv2 = document.createElement('div');
        clockDiv2.className = 'clockDiv2';
        let clockSpan2 = document.createElement('span');
        clockSpan2.className = 'clockSpan2';
        document.body.appendChild(clockDiv2);
        clockDiv2.appendChild(clockSpan2);


        clockDiv2.style.textAlign = 'center';
        clockSpan2.style.display = 'inline-block';
        clockSpan2.style.padding = '6px';
        clockSpan2.style.border = '1px solid black';
        clockSpan2.style.margin = '6px';

        let h = 12;
        let m = 0;
        let s = 0;
        let amPm = 'AM';
        let amPmCounter = 0;
        
        function setTime2() {
            if (m.toString().length === 1) {
                m = '0' + m;
            }
            if (s.toString().length === 1) {
                s = '0' + s;
            }

            clockSpan2.innerHTML = h + ':' + m + ':' + s + ' ' + amPm;
            s++;
            if (s === 60) {
                s = 0;
                m++;
            }
            if (m === 60) {
                m = 0;
                h++;
                amPmCounter++;
            }
            if (h > 12) {
                h = 1;
            }
            if (amPmCounter === 12) {
                amPm = amPm === 'AM' ? 'PM' : 'AM';
                amPmCounter = 0;
            }
        }

        setTime2();
        setInterval(setTime2, 1000);
    }

    theModule.resetClock = resetClock;

}(BGUtils));

