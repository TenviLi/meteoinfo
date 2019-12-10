/**
 * 修饰器: 原始报码校验器
 * @param target
 * @param propertyName
 * @param descriptor
 */
export const checkRawCodeReport = (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<Function>
) => {
    let method = descriptor.value;
    descriptor.value = function() {
        let raw = arguments[0];

        if (!raw) throw Error("报文不得为空");
        if (/[^TPABCD0-9\/\s]/.exec(raw) !== null)
            throw SyntaxError("报文出现非法字符");
        if (!raw.endsWith("=")) throw SyntaxError("报文没有结束符");

        target.raw = raw;
        raw.substr(0, raw.length - 1);
        raw = raw.replace(/s+/, "");

        const type = raw.slice(0, 4);
        if (!CodeType[type]) throw TypeError("非法报文类型");
        target.type = type;

        if (str.length % len === 0) throw Error("字符串格式不正确");

        return method.apply(this, arguments);
    };
};

export const rawCodePreProcess = <T extends CodeDataGroup>(
    groupNodesNum: number = 3,
    groupClass: T
) => (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<Function>
) => {
    let method = descriptor.value;
    descriptor.value = function() {
        let raw = arguments[0];

        if (!raw) throw Error("报文不得为空");
        if (/[^TPABCD0-9\/\s]/.exec(raw) !== null)
            throw SyntaxError("报文出现非法字符");
        if (!raw.endsWith("=")) throw SyntaxError("报文没有结束符");

        target.raw = raw;
        raw.substr(0, raw.length - 1);
        raw = raw.replace(/s+/, "");

        const type = raw.slice(0, 4);
        if (!CodeType[type]) throw TypeError("非法报文类型");
        target.type = type;

        const chunkStrByLength = (str: string, len: number) => {
            if (str.length % len === 0) throw Error("字符串格式不正确");

            const result: Array<CodeNode> = [type];
            let count: number = 0;
            for (let i = 4; i < str.length; i += len, count++) {
                result.push(new CodeNode(str.substr(i, len)));
            }
            return result;
        };
        target.Nodes = chunkStrByLength.call(raw, 5);
        const chunkArrayByLength = (arr: Array<Code>, len: number) => {
            const result: Array<T> = [];
            for (let i = 0; i < arr.length; i += len) {
                result.push(new groupClass(target.Nodes.slice(i, i + len)));
            }
            return result;
        };
        target.dataGroups = chunkArrayByLength.call(
            target.Nodes,
            groupNodesNum
        );

        return method.apply(this, arguments);
    };
};
