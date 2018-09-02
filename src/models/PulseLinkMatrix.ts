import { PULSE_RATE_MIN, PULSE_RATE_MAX, PULSE_RATE_STEP, LINK_RATE_MAX, LINK_RATE_STEP, TRACE_SIZE_DIVISOR } from './../MagicNumbers';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { PlanetPackage } from './AbstractPlanetModel';
import { Position, DrawableObject, GradientLine, ColorPoint } from 'blacksheep-geometry';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { getStandardPhase } from '../standard/parameters';
import { pulsePhaser } from '../functions/phasers/PulsePhaser';
import { AbstractModel } from './AbstractModel';
import { SimpleParameter } from '../parameters/SimpleParameter';
import { fullClone } from 'davids-toolbox';
export class PulseLinkMatrix extends AbstractModel {

    linkrate = new SimpleParameter(1, LINK_RATE_MAX, LINK_RATE_STEP, LINK_RATE_MAX / 2, "link-rate");
    pulseRate = new SimpleParameter(PULSE_RATE_MIN, PULSE_RATE_MAX, PULSE_RATE_STEP, 500, "pulse-rate")
    linkSize = new SimpleParameter(1, 10, 1, 2, "link-size")

    initPhase = getStandardPhase("init-phase");
    opacityAdjust = new SimpleParameter(0, 1, 0.01, 1, "link-opacity-adjust");


    params = [this.linkrate, this.pulseRate, this.initPhase, this.opacityAdjust, this.linkSize];
    constructor() {
        super();

    }

    getRenderHint(): RenderHint {
        return {
            type: "icon",
            params: this.renderParams,
            icon: "pen",
        };
    }

    setLinkRate(rate: number) {
        this.linkrate.updateValue(rate);
    }

    setPulseRate(rate: number) {
        this.pulseRate.updateValue(rate);
    }

    setInitPhase(rate: number) {
        this.initPhase.updateValue(rate);
    }

    getLinks(
        time: number,
        ...position: ColorPoint[]
    ): DrawableObject[] {

        let objs: DrawableObject[] = [];
        if (pulsePhaser(
            time,
            this.pulseRate.getValue(),
            this.initPhase.getValue()
        ) && time % this.linkrate.getValue() === 0) {

            for (let i = 0; i < position.length; i++) {
                for (let j = 1; j < position.length; j++) {
                    if (i !== j) {

                        let cp1 = <ColorPoint>fullClone(position[i]);
                        let cp2 = <ColorPoint>fullClone(position[j]);

                        cp1.color.a = cp1.color.a * this.opacityAdjust.getValue();
                        cp2.color.a = cp2.color.a * this.opacityAdjust.getValue();

                        objs.push(new GradientLine(cp1, cp2, this.linkSize.getValue()));
                    }
                }
            }
        }
        return objs;
    }
}