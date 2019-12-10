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

import { IDatable } from "../interface/Datable";

export const extractVariables = (...names: Array<string>) =>
    function classDecorator<T extends { new (...args: any[]): {} }>(constr: T) {
        return class extends constr {
            constructor(...args: any[]) {
                super(...args);

                const content = args[0];
                let vIndex: number = 0;
                for (const variableName of names) {
                    const variableLength: number = variableName.length,
                        variableValue: number = Number.parseInt(
                            content.substr(vIndex, variableLength)
                        );
                    vIndex += variableLength;
                    Reflect.defineProperty(this, variableName, {
                        value: variableValue
                    });
                }
            }
        };
    };

export function extractDataFromNode<T extends { new (...args: any[]): {} }>(
    constr: T
) {
    return class extends constr {
        constructor(...args: any[]) {
            super(...args);

            const arr: Array<IDatable> = args[0];
            let res: object = {};
            for (const a of arr) {
                res = {
                    ...res,
                    ...a.data
                };
            }
            Reflect.defineProperty(constr, "data", { value: res });
        }
    };
}

export const transferVariable = (fn?: Function) =>
    function methodDecorator(
        target: any,
        propertyName: string,
        descriptor: TypedPropertyDescriptor<Function>
    ) {
        let method = descriptor.value;
        descriptor.value = function() {};
    };
