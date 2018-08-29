import { AbstractFlowerModel } from './AbstractFlowerModel';
import { AbstractModel } from './AbstractModel';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { PlanetPackage, AbstractPlanetModel } from './AbstractPlanetModel';
import { GeoPlanetModel } from './GeoPlanetModel';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { SimpleParameter } from "../parameters/SimpleParameter";
import { getStandardDistance, getStandardColor, } from "../standard/parameters";
import { Position } from "blacksheep-geometry";
import { createConvexFlower, createConcaveFlower } from '../standard/shapes';



export class ConcaveFlowerModel extends AbstractFlowerModel {

    regenGeoPlanet() {
        this.p = createConcaveFlower(
            this.nSides.getValue(),
            this.distance.getValue(),
            this.center,
            this.depth.getValue(),
            this.color.getValue(),
            this.speed.getValue() * 10000 ,
        );
    }


    nSides: AbstractParameter<number> = new SimpleParameter(3, 15, 2, 3, "n-sides");

    constructor(
        color: boolean,
        speed: boolean,
        distance: boolean,
        initPhase: boolean,
        center: Position,
        nSides: boolean,
        depth: boolean,
        detune: boolean,
    ) {

        super(color, speed, distance, initPhase, center, nSides, depth, detune);
    }

}