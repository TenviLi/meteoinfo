/*
 * Copyright 2019 gylidian
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
