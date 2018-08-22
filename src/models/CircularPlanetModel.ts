import { AbstractPlanetModel, PlanetPackage } from "./AbstractPlanetModel";
import { makePlanetPreview } from "../functions/renderers/tracers";
import { circularOrbit } from "../functions/positioners/orbits";
import { makeOrbitPreview } from "../functions/renderers/orbits";
import { ColorPoint } from "blacksheep-geometry";

export class CircularPlanetModel extends AbstractPlanetModel {

    constructor(
        color: boolean = true,
        speed: boolean = true,
        distance: boolean = true,
        initPhase: boolean = true,
    ) {
        super(color, speed, distance, initPhase);
    }


    subTick(time: number): PlanetPackage {

        let speedAdjust = this.speed.getValue()/1000; 

        let position = circularOrbit(time, 0, this.center, speedAdjust, this.distance.getValue());

        return {
            previews: [
                makeOrbitPreview(this.center, this.distance.getValue()), 
                makePlanetPreview(position, this.color.getValue())
            ],
            colorPoints: [
                new ColorPoint(position, this.color.getValue())
            ]
        };
    }
}