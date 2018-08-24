import { AdjustParameter } from './../parameters/AdjustParam';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { SimpleParameter } from "../parameters/SimpleParameter";




export function getStandardSpeed(label: string): AdjustParameter<number> {
    const speed = new SimpleParameter(-42, 42, 1, 10, label);
    return new AdjustParameter(
        "adjust" + label,
         speed,
        (v: number) => v / 84000
    );
    
}

export function getStandardDistance(label: string): SimpleParameter {
    return new SimpleParameter(0, 0.5, 0.01, 0.25, label)
}

export function getStandardPhase(label: string): SimpleParameter {
   return  new  SimpleParameter(Math.PI * -1, Math.PI, 0.1, 0, label)
}

