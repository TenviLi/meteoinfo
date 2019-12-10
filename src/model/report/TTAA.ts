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

import { CodeReport } from "../CodeReport.model";
import { CodeReportType } from "../definition";
import { IMetable } from "../interface/Metable";
import { DataItem } from "../DataItem.model";
import { DataGroup } from "../DataGroup.model";
import { CodeNode, hhPPP, TTTDD, dddff } from "../CodeNode.model";

const DATAITEM_NODENUM = 3;

/**
 *  TTAA indicates the temperature coded message for the mandatory levels below 100hPa,
 */
export class TTAA extends CodeReport {
    readonly type: CodeReportType = CodeReportType.TTAA;

    toMet(): IMetable {
        const result: Array<DataItem> = [];
        for (let i = 3; i < this.Nodes.length; i += DATAITEM_NODENUM) {
            const temp: Array<CodeNode> = this.Nodes.slice(
                i,
                i + DATAITEM_NODENUM
            );
            result.push(
                new DataItem([<hhPPP>temp[0], <TTTDD>temp[1], <dddff>temp[2]])
            );
        }

        return {
            head: this.head,
            data: new DataGroup(...result)
        };
    }
}
