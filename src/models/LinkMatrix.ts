import { LINK_RATE_MAX, LINK_RATE_STEP } from './../MagicNumbers';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { Position, DrawableObject, GradientLine, ColorPoint } from 'blacksheep-geometry';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { SimpleParameter } from '../parameters/SimpleParameter';
export class LinkMatrix {


    linkRate: AbstractParameter<number>;
    params: AbstractParameter<any>[];
    constructor(
        linkRate: AbstractParameter<number> = new SimpleParameter(1, LINK_RATE_MAX, LINK_RATE_STEP, 50, "link-rate")) {
        this.linkRate = linkRate;

        this.params = [this.linkRate];
    }



    getRenderHint(): RenderHint {
        return {
            type: "icon",
            icon: "cog",
            params: [this.linkRate]
        };
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