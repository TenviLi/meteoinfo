import { CodeReport } from "./CodeReport.model";
import { CodeReportType } from "./definition";
import { CodeNode } from "./CodeNode.model";

// TODO: 支持识别Report以外的其他CodeNode
// TODO: 支持AAXX地面报文
export class Code {
    /**
     * 各部型报文
     */
    private reports: Array<CodeReport>;

    /**
     * 构造器
     * @description 负责把完整报文转换成各部型报文
     * @param str 完整报文
     */
    constructor(str: string) {}

    /**
     * 返回一个实例
     * @param str 完整报文
     */
    static resolve(str: string) {}

    /**
     * 分割各个部段
     */
    private chunk() {}
}
