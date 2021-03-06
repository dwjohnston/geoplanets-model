import { SPEED_DIVISOR, STANDARD_SPEED_RANGE } from './../MagicNumbers';
import { Color } from 'blacksheep-geometry';
import { AdjustParameter } from './../parameters/AdjustParam';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { SimpleParameter } from "../parameters/SimpleParameter";
import { ColorParameter } from '../parameters/ColorParameter';




export function getStandardSpeed(label: string = "speed", multiplier = 1, init = 10): AdjustParameter<number> {
    const speed = new SimpleParameter(STANDARD_SPEED_RANGE * -1 * multiplier, STANDARD_SPEED_RANGE * multiplier, 1, init, label);
    return new AdjustParameter(
        "adjust" + label,
        speed,
        (v: number) => v / SPEED_DIVISOR
    );

}

export function getStandardDistance(label: string = "distance"): SimpleParameter {
    return new SimpleParameter(0, 0.5, 0.01, 0.25, label)
}

export function getStandardPhase(label: string = "phase"): SimpleParameter {
    return new SimpleParameter(Math.PI * -1, Math.PI, 0.1, 0, label)
}

export function getStandardColor(label: string = "color", color = new Color(255, 255, 255, 0.3)) {
    return new ColorParameter(label, color);
}


export function getStandardNSides(label: string = "n-sides") {
    return new SimpleParameter(2, 9, 1, 3, label);
}