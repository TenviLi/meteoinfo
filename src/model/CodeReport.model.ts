import { CodeNode, YYGGd, IIiii } from "./CodeNode.model";
import { CodeReportType } from "./definition";
import { IMetable } from "./interface/Metable";

const NODECHARNUM = 5;

/**
 * 报告
 * @todo 当前实现是依靠一次性读取再划分CodeNode的形式，正在寻找类似cin的读取方式
 */
export abstract class CodeReport {
    /**
     * 格式化后的完整报码
     */
    protected readonly _raw: string;
    /**
     * 报文部型
     */
    protected readonly type: CodeReportType;
    /**
     * 报文各个结点
     */
    protected Nodes: Array<CodeNode>;
    /**
     * 头部结点
     */
    protected head: Array<CodeNode>;
    /**
     * 构造器
     * @param str 传入完整报文
     */
    constructor(str: string) {
        this._raw = str;
        const fstr = this.format(str);

        const type = fstr.slice(0, 4);
        if (!CodeReportType[type]) throw TypeError("非法报文类型");

        this.Nodes.push(new CodeNode(CodeReportType[this.type]));
        for (let i = 4; i < fstr.length; i += NODECHARNUM)
            this.Nodes.push(new CodeNode(fstr.substr(i, NODECHARNUM)));

        this.head = [this.Nodes[0], <YYGGd>this.Nodes[1], <IIiii>this.Nodes[2]];
    }

    /**
     * 格式化完整报码
     * @description ①识别报文类型 ②去除结束符`=` ③祛除空格重新划分报文结点
     * @param str
     */
    private format(str: string): string {
        if (!str) throw Error("报文不得为空");
        if (/[^TPABCD0-9\/\s]/.exec(str) !== null)
            throw SyntaxError("报文出现非法字符");
        if (!str.endsWith("=")) throw SyntaxError("报文没有结束符");

        str.substr(0, str.length - 1);
        str = str.replace(/s+/, "");
        if (str.length % NODECHARNUM === 0) throw Error("字符串格式不正确");
        return str;
    }

    /**
     * 输出Met数据
     */
    abstract toMet(): IMetable;
}
