import { Position } from 'blacksheep-geometry';
import { AbstractFlowerModel } from './AbstractFlowerModel';
import { SimpleParameter } from './../parameters/SimpleParameter';
import { AbstractModel } from './AbstractModel';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { PlanetPackage, AbstractPlanetModel } from './AbstractPlanetModel';

import { GeoPlanetModel } from './GeoPlanetModel';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { createConvexFlower } from '../standard/shapes';



export class ConvexFlowerModel extends AbstractFlowerModel {

    nSides: AbstractParameter<number> = new SimpleParameter(2, 12, 1, 3, "n-sides");

    regenGeoPlanet() {
        this.p = createConvexFlower(
            this.nSides.getValue(),
            this.distance.getValue(),
            this.center,
            this.depth.getValue(),
            this.color.getValue(),
            this.speed.getValue() * 10000,
            this.rotatePhase.getValue(),


        );
    }

    constructor(
        color: boolean,
        speed: boolean,
        distance: boolean,
        initPhase: boolean,
        center: Position,
        nSides: boolean,
        depth: boolean,
        detune: boolean,
        rotatePhase: boolean,
    ) {

        super(color, speed, distance, initPhase, center, nSides, depth, detune, rotatePhase);
    }

}