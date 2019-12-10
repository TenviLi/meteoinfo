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

import { extractVariables } from "../discriptor/node";
import { CodeNode } from "../CodeNode.model";
import { IDatable } from "../interface/Datable";
import { isOdd } from "../../util";

@extractVariables("hh", "ZZZ")
export class hhZZZ extends CodeNode implements IDatable {
    /**
     * PP indicates the code for the mandatory pressure level of that group
     */
    private hh: number;
    /**
     * ZZZ indicates the code for the geopotential height of the rawinsonde when it reached that mandatory level
     */
    private ZZZ: number;

    heightMap = {
        /**
         * 99 indicates that data from the surface follows
         *
         * `99PoPoPo TTTDD dddff`
         *
         * - 99 indicates that data from the surface follows
         * - PoPoPo indicates the surface pressure in whole hPa.
         *   - Note: if the surface pressure is greater than 999 hPa, the first digit (1) is omitted.
         *
         * Note: 其他组的 TTT, DD, ddd, and ff all use the same formats as for the surface group.
         */
        99: {
            pressureLevel: "surface",
            approximateHeight: 0, // AGL
            handler: (zzz: number) => (zzz <= 100 ? zzz + 1000 : zzz)
        },
        0: {
            pressureLevel: 1000,
            approximateHeight: 100,
            handler: (zzz: number) => (zzz > 500 ? 500 - zzz : zzz)
        },
        92: {
            pressureLevel: 925,
            approximateHeight: 800,
            handler: () => {} // TODO: 92的handler缺失
        },
        85: {
            pressureLevel: 850,
            approximateHeight: 1500,
            handler: (zzz: number) => zzz + 1000
        },
        70: {
            pressureLevel: 700,
            approximateHeight: 3000,
            handler: (zzz: number) => (zzz > 300 ? zzz + 2000 : zzz + 3000)
        },
        50: {
            pressureLevel: 500,
            approximateHeight: 5500,
            handler: (zzz: number) => zzz * 10
        },
        40: {
            pressureLevel: 400,
            approximateHeight: 7500,
            handler: (zzz: number) => zzz * 10
        },
        30: {
            pressureLevel: 300,
            approximateHeight: 9000,
            handler: (zzz: number) => (zzz < 500 ? (zzz + 1000) * 10 : zzz * 10)
        },
        25: {
            pressureLevel: 250,
            approximateHeight: 10500,
            handler: (zzz: number) => (zzz < 500 ? (zzz + 1000) * 10 : zzz * 10)
        },
        20: {
            pressureLevel: 200,
            approximateHeight: 12000,
            handler: (zzz: number) => (zzz + 1000) * 10
        },
        15: {
            pressureLevel: 150,
            approximateHeight: 14000,
            handler: (zzz: number) => (zzz + 1000) * 10
        },
        10: {
            pressureLevel: 100,
            approximateHeight: 16000,
            handler: (zzz: number) => (zzz + 1000) * 10
        },
        /**
         * The tropopause information is given by the 88 group, which has the format.
         *
         * `88PtPtPt TTTDD dddff`
         *
         * where PtPtPt indicates the pressure at the tropopause in hPa.
         */
        88: {
            pressureLevel: "trop", // tropopause
            approximateHeight: "variable"
        },

        /*
         * The maximum wind level is reported in the 77 or in the 66 groups.
         * The maximum wind groups have the format
         * `MWPmPmPm dddff`
         * where
         * MW = 77 or 66,
         * PmPmPm indicates the pressure of the maximum wind level in hPa,
         * ddd is the wind direction at the maximum wind level in degrees,
         * ff is the wind speed at the maximum wind level in knots.
         */
        /**
         * A 77 group indicates that the level for which the maximum wind data are reported does not coincide with the top of the wind sounding.
         */
        77: {
            pressureLevel: "trop",
            approximateHeight: "variable"
        },
        /**
         * A 66 group indicates that the top of the wind sounding corresponds to the highest wind speed observed throughout the ascent.
         */
        66: {
            pressureLevel: "trop",
            approximateHeight: "variable"
        }
    };

    isobaric: number | string = this.hh;

    pressure: number = this.heightMap[this.hh].handler(this.ZZZ);

    geopotentialHeight: number | string = this.heightMap[this.hh]
        .approximateHeight;

    get data() {
        return {
            isobaric: this.isobaric,
            pressure: this.pressure
        };
    }
}

export { TTTDD } from "./common";

/**
 * dddff indicates wind direction and speed.
 */
@extractVariables("ddd", "ff")
export class dddff extends CodeNode implements IDatable {
    /**
     * ddd indicates the wind direction reported for the mandatory level
     */
    private ddd: number;
    /**
     * ff indicates the wind speed reported for the mandatory level.
     * If ddd is not divisible by 5, then 1 has been added to the wind direction, and 100 must be added to ff to get the wind speed in knots.
     */
    private ff: number; // TODO: 如上

    /**
     * ff 风速
     * - 单位:
     *   - YY>50 `0.5m/s`
     *   - Y<=50 `1m/s`
     */
    speed(YY: number): number {
        return YY > 50 ? this.ff * 2 : this.ff;
    }

    get data() {
        return (YY: number) => {
            return {
                direction: this.ddd % 5 === 0 ? this.ddd : null,
                speed: this.speed(YY)
            };
        };
    }
}

// TODO: 把77 66拎出来
// @extractVariables("MW", "mmm")
// export class MWmmm extends CodeNode implements IDatable {
//     /**
//      * MW = 77 or 66
//      */
//     private MW: number;
//     /**
//      * PmPmPm indicates the pressure of the maximum wind level in hPa
//      */
//     private mmm: number;
// }

/**
 * The 4 group indicates wind shear information.
 *
 * `4vbvbvava`
 */
@extractVariables("4", "bb", "aa") // TODO: extractVariabels 支持跳过字符解析
export class vbbaa extends CodeNode implements IDatable {
    /**
     * vbvb indicates the absolute value of the vector difference between the maximum wind and the wind 1 km below the maximum wind.
     */
    private bb: number;
    /**
     * vava indicates the absolute value of the vector difference between the maximum wind and the wind 1 km above the level of the maximum wind.
     */
    private aa: number;

    get data() {
        return {
            vbvb: this.bb,
            vava: this.aa
        };
    }
}

/*
 * 51515 indicates that supplemental data follows.
 */

/**
 * The format of the Lifted Index group is
 *
 * `10164 LLLLL`
 */
@extractVariables("LLLLL")
export class LLLLL extends CodeNode implements IDatable {
    /**
     * LLLLL indicates the Lifted Index in tenths of a degree Celsius.
     * - If LLLLL > 50, subtract  50 and divide by 10 to get LI.
     * - If LLLLL ≤ 50, divide by ten to get LI.
     * - If LLLLL is an odd number, then LI<0.
     */
    private LLLLL: number;

    /**
     * The Lifted Index (LI) is the difference between the temperature of the environment at 500 hPa and the temperature of a parcel lifted to the 500 hPa level.
     * LI = Tenvironment(500 hPa) – Tparcel(500 hPa)
     */
    get LL(): number {
        let res = this.LLLLL > 50 ? (this.LLLLL - 50) * 0.1 : this.LLLLL * 0.1;
        if (isOdd(res)) res *= -1;
        return res;
    }

    get data() {
        return {
            LL: this.LL
        };
    }
}

/*
 * The 10194 group indicates that the Mean Low Level Wind groups follow.  The format of the Mean Low Level Wind groups is
 *
 * `10194 d1d1d1f1f1 d2d2d2f2f2`
 *
 * - The first group after 10194 indicates the mean wind direction and wind speed for the layer from the surface to 5000 feet.
 * - The second group after 10194 indicates the mean wind direction and wind speed for the layer from 5000 to 10,000 feet.
 */
