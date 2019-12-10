import { extractVariables } from "../discriptor/node";
import { CodeNode } from "../CodeNode.model";
import { IDatable } from "../interface/Datable";

@extractVariables("nnPPP") // TODO: extractVariabels 支持跳过字符解析
export class nnPPP extends CodeNode implements IDatable {
    /**
     * nn = 11, 22, 33, 44, 55, 66, 77, 88, 99, repeated as necessary, and indicates the order of the groups.
     */
    private nn: number;
    /**
     * PPP indicates the pressure of the significant level
     */
    private PPP: number;

    get data() {
        return {
            vbvb: this.bb,
            vava: this.aa
        };
    }
}

export { TTTDD } from "./common";

/*
 * 31313 srrarasasa 8GGgg (9snTWTWTW)

 * 31313 indicates that supplemental information follows

 * sr indicates the code for the solar radiation correction
 * rara indicates the type of radiosonde/sounding system used
 * sasa indicates the tracking technique and the status of the system used
 * 8GGgg indicates the launch time in UTC

 * (9snTWTWTW) indicates the Sea Surface Temperature (SST) in tenths of degree Celsius for shipboard launches.
 * sn indicates the sign of the SST
 * TWTWTW indicates the SST in tenths of degrees Celsius
 */

/*
 * 41414 NhCLhCMCH

 * 41414 indicates that cloud information follows
 * Nh indicates the cloud coverage in the lowest layer of low or middle clouds
 * CL indicates the type of low cloud
 * h indicates the height above the surface of the lowest cloud seen
 * CM indicates the type of middle cloud
 * CH indicates the type of high cloud
 */
