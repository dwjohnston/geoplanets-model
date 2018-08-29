import { RenderHint } from './../../lib/algorithms/internal/RenderMap.d';
import { PlanetPackage } from './AbstractPlanetModel';
import { Position, DrawableObject, GradientLine, ColorPoint } from 'blacksheep-geometry';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { getStandardPhase } from '../standard/parameters';
import { pulsePhaser } from '../functions/phasers/PulsePhaser';
import { AbstractModel } from './AbstractModel';
import { SimpleParameter } from '../parameters/SimpleParameter';
export class PulseLinkMatrix extends AbstractModel {

    linkrate = new SimpleParameter(1, 200, 1, 50, "link-rate");
    pulseRate = new SimpleParameter(100, 1000, 10, 500, "link-rate")
    initPhase = getStandardPhase("init-phase");

    params = [this.linkrate, this.pulseRate, this.initPhase];
    constructor() {
        super();

    }

    getRenderHint(): RenderHint {
        return {
            type: "icon",
            icon: "pen",
            params: [this.linkrate, this.pulseRate, this.initPhase]
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
                        objs.push(new GradientLine(position[i], position[j]));
                    }
                }
            }
        }
        return objs;
    }
}