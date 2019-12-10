import { DataItem } from "./DataItem.model";

export class DataGroup {
    private items: Array<DataItem>;

    constructor(...args: Array<DataItem>) {
        this.items = args;
    }

    addDataItem(...args: Array<DataItem>) {
        this.items = [...this.items, ...args];
    }

    getTable(attr: string) {}
}
