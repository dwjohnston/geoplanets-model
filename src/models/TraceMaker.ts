import { PULSE_RATE_MIN, PULSE_RATE_MAX, PULSE_RATE_STEP, LINK_RATE_MAX, LINK_RATE_STEP, TRACE_SIZE_DIVISOR, TRACE_RATE_MAX } from './../MagicNumbers';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { PlanetPackage } from './AbstractPlanetModel';
import { Position, DrawableObject, GradientLine, ColorPoint, Circle, Color } from 'blacksheep-geometry';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { getStandardPhase } from '../standard/parameters';
import { pulsePhaser } from '../functions/phasers/PulsePhaser';
import { AbstractModel } from './AbstractModel';
import { SimpleParameter } from '../parameters/SimpleParameter';
import { makePlanetDots } from '../functions/renderers/tracers';
export class TraceMaker extends AbstractModel {

    opacityAdjust = new SimpleParameter(0, 1, 0.01, 1, "trace-opacity-adjust");
    size = new SimpleParameter(0, 1, 0.01, 0.03, "size");
    drawRate = new SimpleParameter(1, TRACE_RATE_MAX, 1, 1, "trace-rate");




    params = [this.opacityAdjust, this.size, this.drawRate];

    constructor() {
        super();

    }

    getRenderHint(): RenderHint {
        return {
            type: "icon",
            params: this.params,
            icon: "pen",
        };
    }

    getRandomParams(): AbstractParameter<any>[] {
        return [
            this.opacityAdjust
        ]
    }


    getTraces(
        time: number,
        ...position: ColorPoint[]
    ): DrawableObject[] {


        if (time % this.drawRate.getValue() === 0) {
            return position.map((v) => {

                let c = new Color(v.color.r, v.color.g, v.color.b, v.color.a * this.opacityAdjust.getValue());

                return new Circle(
                    this.size.getValue() / TRACE_SIZE_DIVISOR,
                    c,
                    v.position,
                    true,
                    2
                );
            });

        }

        else {
            return [];
        }


    }
}