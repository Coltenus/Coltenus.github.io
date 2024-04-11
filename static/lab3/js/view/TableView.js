import { TimeToString } from "../common.js";

export default class TableView {
    constructor(tableModel) {
        this.tableModel = tableModel;
    }

    tableItemDisplay(id) {
        const tableItem = this.tableModel.getItem(id);
        return `<tr>
            <th scope="row">${id}</th>
            <td>${tableItem.getLabel()}</td>
            <td>${TimeToString(tableItem.getStartTime())}</td>
            <td>${TimeToString(tableItem.getEndTime())}</td>
            <td>${TimeToString(tableItem.getSpentTime())}</td>
        </tr>`;
    }

    tableDisplay() {
        let tableItems = this.tableModel.getItems();
        let table = "";
        tableItems.forEach(item => {
            table += this.tableItemDisplay(item.getId());
        });
        return table;
    }
}