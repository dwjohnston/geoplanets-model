import { AbstractPlanetModel, PlanetPackage } from "./AbstractPlanetModel";
import { makePlanetPreview } from "../functions/renderers/tracers";
import { circularOrbit } from "../functions/positioners/orbits";
import { makeOrbitPreview } from "../functions/renderers/orbits";
import { ColorPoint, Position, Color } from "blacksheep-geometry";
import { AdjustParameter } from "../parameters/AdjustParam";
import { getStandardSpeed, getStandardDistance, getStandardPhase, getStandardColor } from "../standard/parameters";
import { ColorParameter } from "../parameters/ColorParameter";
import { AbstractParameter } from "../parameters/AbstractParameter";

export class CircularPlanetModel extends AbstractPlanetModel {

    constructor(
        speed: AdjustParameter<number> = getStandardSpeed(),
        distance: AbstractParameter<number> = getStandardDistance(),
        initPhase: AbstractParameter<number> = getStandardPhase(),
        color: AbstractParameter<Color> = getStandardColor(),
        center: Position = new Position(0.5, 0.5)
    ) {
        super(speed, distance, initPhase, color, center);
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