import TableItem from "./TableItemModel.js";

export default class Table {
    constructor() {
        this.tableItems = [];
        this.id = 0;
    }

    addItem(label, stTime, endTime, spentTime) {
        this.id++;
        this.tableItems.push(new TableItem(this.id, label, stTime, endTime, spentTime));
    }

    getItems() {
        return this.tableItems;
    }

    getItem(id) {
        return this.tableItems.find(item => item.getId() === id);
    }

    removeItem(id) {
        this.tableItems = this.tableItems.filter(item => item.getId() !== id);
    }
}