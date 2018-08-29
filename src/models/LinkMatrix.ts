import { Position, DrawableObject, GradientLine, ColorPoint } from 'blacksheep-geometry';
import { AbstractParameter } from "../parameters/AbstractParameter";
export class LinkMatrix {


    linkRate: AbstractParameter<number>;
    constructor(linkRate: AbstractParameter<number>) {
        this.linkRate = linkRate;
    }


    getLinks(time: number, ...position: ColorPoint[]): DrawableObject[] {

        let objs: DrawableObject[] = [];
        if (time % this.linkRate.getValue() === 0) {

            for (let i = 0; i < position.length; i++) {
                for (let j = 1; j < position.length; j++) {
                    if (i !== j) {
                        objs.push(new GradientLine(position[i], position[j]));
                    }
                }
            }
        }
        return objs;
    }
}