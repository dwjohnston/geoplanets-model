import { SPEED_DIVISOR } from './../MagicNumbers';
import { AbstractFlowerModel } from './AbstractFlowerModel';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { SimpleParameter } from "../parameters/SimpleParameter";
import { getStandardDistance, getStandardColor, getStandardPhase, getStandardSpeed, } from "../standard/parameters";
import { Position, Color } from "blacksheep-geometry";
import { createConcaveFlower } from '../standard/shapes';
import { AdjustParameter } from '../parameters/AdjustParam';



export class ConcaveFlowerModel extends AbstractFlowerModel {

    regenGeoPlanet() {
        this.p = createConcaveFlower(
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
        nSides: AbstractParameter<number> = new SimpleParameter(3, 15, 2, 3, "n-sides"),
        depth = new SimpleParameter(2, 5, 1, 2, "depth"),
        detune = new SimpleParameter(-0.5, 0.5, 0.01, 0, "detune"),
        rotatePhase = getStandardPhase("rotate-phase"),

    ) {

        super(speed, distance, initPhase, color, center, nSides, depth, detune, rotatePhase);
    }

}