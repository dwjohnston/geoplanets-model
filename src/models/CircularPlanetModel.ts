import { AbstractPlanetModel, PlanetPackage } from "./AbstractPlanetModel";
import { makePlanetPreview } from "../functions/renderers/tracers";
import { circularOrbit } from "../functions/positioners/orbits";
import { makeOrbitPreview } from "../functions/renderers/orbits";
import { ColorPoint, Position } from "blacksheep-geometry";

export class CircularPlanetModel extends AbstractPlanetModel {

    constructor(
        color: boolean = true,
        speed: boolean = true,
        distance: boolean = true,
        initPhase: boolean = true,
        center: Position = new Position(0.5, 0.5),
    ) {
        super(color, speed, distance, initPhase, center);
    }


    subTick(time: number): PlanetPackage {

        let position = circularOrbit(time, 0, this.center, this.speed.getValue(), this.distance.getValue());
        this.positions[0].updateFromPosition(position);
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