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
