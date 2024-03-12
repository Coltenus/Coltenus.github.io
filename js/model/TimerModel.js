export default class Timer {
    constructor() {
        this.started = false;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.secondsSt = -1;
        this.minutesSt = -1;
        this.hoursSt = -1;
        this.secondsSp = 0;
        this.minutesSp = 0;
        this.hoursSp = 0;
        setInterval(() => {
            if (this.started) {
                this.incrementTimer();
            }
        }, 1000);
    }

    startTimer(date) {
        this.seconds = date.getSeconds();
        this.minutes = date.getMinutes();
        this.hours = date.getHours();
        if(this.secondsSt === -1) {
            this.secondsSt = this.seconds;
            this.minutesSt = this.minutes;
            this.hoursSt = this.hours;
        }
        this.started = true;
    }

    stopTimer() {
        this.started = false;
    }

    incrementTimer() {
        this.seconds++;
        if (this.seconds === 60) {
            this.seconds = 0;
            this.minutes++;
        }
        if (this.minutes === 60) {
            this.minutes = 0;
            this.hours++;
        }
        this.secondsSp++;
        if (this.secondsSp === 60) {
            this.secondsSp = 0;
            this.minutesSp++;
        }
        if (this.minutesSp === 60) {
            this.minutesSp = 0;
            this.hoursSp++;
        }
    }

    resetTimer() {
        this.started = false;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.secondsSt = -1;
        this.minutesSt = -1;
        this.hoursSt = -1;
        this.secondsSp = 0;
        this.minutesSp = 0;
        this.hoursSp = 0;
    }

    getTimer() {
        return {
            seconds: this.seconds,
            minutes: this.minutes,
            hours: this.hours
        }
    }

    getTimerStart() {
        return {
            seconds: this.secondsSt,
            minutes: this.minutesSt,
            hours: this.hoursSt
        }
    }

    getSpentTime() {
        return {
            seconds: this.secondsSp,
            minutes: this.minutesSp,
            hours: this.hoursSp
        }
    }

    isStarted() {
        return this.started;
    }
}