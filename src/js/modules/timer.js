const timer = (timerSelector, deadline) => {

    const addZeroToNum = (num) => num <= 9 ? `0${num}` : num;

    const getTimerRemaining = (deadline) => {

        let t = Date.parse(deadline) - Date.parse(new Date());
        if (Date.parse(deadline) <= Date.parse(new Date)) t = 0;
        
        const days = Math.floor(t / (1000 * 60 ** 2 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const setClock = (timerSelector, deadline) => {
        const timer = document.querySelector(timerSelector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimerRemaining(deadline);
            days.textContent = addZeroToNum(t.days);
            hours.textContent = addZeroToNum(t.hours);
            minutes.textContent = addZeroToNum(t.minutes);
            seconds.textContent = addZeroToNum(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };
    getTimerRemaining(deadline);
    setClock(timerSelector, deadline);



}
export default timer;