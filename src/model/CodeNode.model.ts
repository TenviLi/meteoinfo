export class CodeNode {
    /**
     * 标准5位原始码
     */
    protected readonly content: string;

    /**
     * 数据变量键值对
     */
    // variables: object;

    constructor(str: string) {
        this.content = str;
    }
}
