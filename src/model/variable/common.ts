import { extractVariables } from "../discriptor/node";
import { CodeNode } from "../CodeNode.model";
import { IDatable } from "../interface/Datable";

// TODO: TypeCodeNode 支持MiMi和MjMj
export class TypeCodeNode extends CodeNode implements IDatable {
    /*
     * MiMi = TT indicates temperature coded message
     * MiMi = PP indicates upper wind coded message
     */
    private MiMi: string;
    /*
     * MjMj = AA indicates mandatory levels below 100 hPa
     * MjMj = BB indicates significant levels below 100 hPa
     * MjMj = CC indicates mandatory levels above 100hPa
     * MjMj = DD indicates significant levels above 100 hPa
     */
    private MjMj: string;

    type = this.content;

    get data() {
        return {
            type: this.type
        };
    }
}

@extractVariables("YY", "GG", "d")
export class YYGGd extends CodeNode implements IDatable {
    /**
     * YY indicates the day of the month.
     * @description when YY>50, it indicates that wind speeds are in knots.  In this case YY-50 equals the day of the month.
     */
    private YY: number; // TODO: 使用修饰器
    /**
     * GG indicates the hour of the sounding in UTC.
     */
    private GG: number;
    /**
     * Id indicates the hundreds (for part AA) or the tens (for part CC) of HPa of the last wind report.
     */
    private d: number;

    dayOfMouth = this.YY > 50 ? this.YY - 50 : this.YY;
    zulu = this.GG;
    iD = this.d;

    get data() {
        return {
            dayOfMouth: this.dayOfMouth,
            zulu: this.zulu,
            iD: this.iD
        };
    }
}

/**
 * WMO identification number
 * @description IIiii indicates the five digit WMO identification number of the upper air station where the rawinsonde was launched.
 * @example `72201` is `Key West, Florida`
 */
@extractVariables("II", "iii")
export class IIiii extends CodeNode implements IDatable {
    private II: number;
    private iii: number;

    get data() {
        return {
            areacode: this.II,
            stationcode: this.iii
        };
    }
}

@extractVariables("TTT", "DD")
export class TTTDD extends CodeNode implements IDatable {
    /**
     * TTT indicates the temperature at the mandatory level in tenths of a degree Celsius.
     *
     * Note: if TTT is an even number, it indicates that the temperature is positive (i.e. greater than 0°C) and if TTT is a odd  number it indicates that the temperature is negative (i.e. less than 0°C).
     */
    private TTT: number;
    /**
     * DD indicates the dew point depression at the mandatory level.
     *
     * The dew point depression is equal to the temperature minus the dew point temperature.
     * - If DD≤50, then divide by 10 to get the dew point depression in tenths of a degree Celsius.
     * - If DD>50, then subtract 50 to get the dew point depression in whole degrees Celsius.
     */
    private DD: number;

    get temperature() {
        let res = this.TTT * 0.1;
        return this.TTT.toString()
            .charAt(this.TTT.toString().length - 1)
            .match(/[02468]/)
            ? res
            : res * -1;
    }

    get data() {
        return {
            temperature: this.temperature,
            dewpoint: this.DD > 50 ? this.DD - 50 : this.DD * 0.1
        };
    }
}
