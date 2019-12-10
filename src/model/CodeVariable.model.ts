abstract class CodeVariable {
    /**
     * n位原始码
     */
    readonly content: string;

    /**
     * 获取真值
     */
    value: number;

    constructor(str: string) {
        this.content = str;
        if (Reflect.has(this, "cul")) this.cul();
        if (Reflect.has(this, "validate")) this.validate();
    }

    /**
     * 计算真值
     */
    abstract cul?(): void;

    /**
     * 输出格式化
     */
    abstract toString(): string;

    /**
     * 校验合法性
     */
    abstract validate?(): void;
}

export namespace CodeVariables {
    export class YY extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class GG extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class d extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class II extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class iii extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class hh extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class PPP extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class TTT extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class DD extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class ddd extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }

    export class ff extends CodeVariable {
        readonly content: string;
        value: number;

        cul() {}

        toString(): string {
            return;
        }

        validate(): boolean {
            return;
        }
    }
}
