import { IDatable } from "./interface/Datable";
import { CodeNode } from "./CodeNode.model";

export class DataItem implements IDatable {
    data: object;
    constructor(arr: Array<CodeNode & IDatable>) {
        for (const i of arr) {
            this.data = { ...this.data, ...i.data };
        }
    }
}
