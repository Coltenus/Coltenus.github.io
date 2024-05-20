import TableItem from "./TableItemModel.js";

export default class TableModel {
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

    setItems(table) {
        let table_ = JSON.parse(table);
        for(let i = 0; i < table_.length; i++) {
            this.tableItems.push(new TableItem(table_[i].id, table_[i].label, table_[i].stTime, table_[i].endTime, table_[i].spentTime));
        }
        this.id = this.tableItems.length;
    }

    getItem(id) {
        return this.tableItems.find(item => item.getId() === id);
    }

    removeItem(id) {
        this.tableItems = this.tableItems.filter(item => item.getId() !== id);
    }
}