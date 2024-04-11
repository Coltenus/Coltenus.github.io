import { TimeToHtml } from "../common.js";

export default class TimerView {
    constructor(timerModel) {
        this.timerModel = timerModel;
    }

    timerDisplay(id) {
        return TimeToHtml(id, this.timerModel.getTimer());
    }

    spentDisplay(id) {
        return TimeToHtml(id, this.timerModel.getSpentTime());
    }

    clearDisplay(id) {
        return TimeToHtml(id, {hours: 0, minutes: 0, seconds: 0});
    }
}