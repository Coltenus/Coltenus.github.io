export default class TableItem {
    constructor(id, label, stTime, endTime, spentTime) {
        this.id = id;
        this.label = label;
        this.stTime = stTime;
        this.endTime = endTime;
        this.spentTime = spentTime;
    }

    getId() {
        return this.id;
    }

    getLabel() {
        return this.label;
    }
    
    getStartTime() {
        return this.stTime;
    }

    getEndTime() {
        return this.endTime;
    }

    getSpentTime() {
        return this.spentTime;
    }
}