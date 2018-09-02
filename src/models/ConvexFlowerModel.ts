import { SPEED_DIVISOR } from './../MagicNumbers';
import { Position, Color } from 'blacksheep-geometry';
import { AbstractFlowerModel } from './AbstractFlowerModel';
import { SimpleParameter } from './../parameters/SimpleParameter';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { createConvexFlower } from '../standard/shapes';
import { AdjustParameter } from '../parameters/AdjustParam';
import { getStandardSpeed, getStandardDistance, getStandardPhase, getStandardColor } from '../standard/parameters';



export class ConvexFlowerModel extends AbstractFlowerModel {

    regenGeoPlanet() {
        this.p = createConvexFlower(
            this.nSides.getValue(),
            this.distance.getValue(),
            this.center,
            this.depth.getValue(),
            this.color.getValue(),
            this.speed.getValue() * SPEED_DIVISOR,
            this.rotatePhase.getValue(),
            this.detune.getValue(),

        );
    }

    constructor(
        speed: AdjustParameter<number> = getStandardSpeed(),
        distance: AbstractParameter<number> = getStandardDistance(),
        initPhase: AbstractParameter<number> = getStandardPhase(),
        color: AbstractParameter<Color> = getStandardColor(),
        center: Position = new Position(0.5, 0.5),
        nSides: AbstractParameter<number> = new SimpleParameter(3, 15, 2, 3, "n-leaves"),
        depth = new SimpleParameter(2, 5, 1, 2, "depth"),
        detune = new SimpleParameter(-0.5, 0.5, 0.01, 0, "detune"),
        rotatePhase = getStandardPhase("rotate-phase"),

    ) {

        super(speed, distance, initPhase, color, center, nSides, depth, detune, rotatePhase);
    }

}