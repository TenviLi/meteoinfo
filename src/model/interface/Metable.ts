import { CodeNode, TypeCodeNode, YYGGd, IIiii } from "../CodeNode.model";
import { DataGroup } from "../DataGroup.model";

/**
 * 可转换成Met数据的
 */
export interface IMetable {
    /**
     * 报文头
     */
    head: Array<CodeNode>;
    /**
     * 数据集
     */
    data: DataGroup;
    /**
     * 补充报文
     */
    supplement?: IMetable;
}
