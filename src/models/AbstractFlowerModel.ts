import { AbstractModel } from './AbstractModel';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { PlanetPackage, AbstractPlanetModel } from './AbstractPlanetModel';
import { GeoPlanetModel } from './GeoPlanetModel';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { SimpleParameter } from "../parameters/SimpleParameter";
import { getStandardDistance, getStandardColor, getStandardPhase, getStandardSpeed, } from "../standard/parameters";
import { Position, Color } from "blacksheep-geometry";
import { createConvexFlower, createConcaveFlower } from '../standard/shapes';
import { AdjustParameter } from '../parameters/AdjustParam';



export class AbstractFlowerModel extends AbstractPlanetModel {

    nSides: AbstractParameter<number>;
    depth: AbstractParameter<number>;
    detune: AbstractParameter<number>;
    rotatePhase: AbstractParameter<number>;


    // speed = getStandardSpeed("speed", 10, 100);


    params: AbstractParameter<any>[];


    p: GeoPlanetModel;

    regenGeoPlanet() {
        throw new Error("regenGeoPlanet() not implemnted")
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

        super(
            speed,
            distance,
            initPhase,
            color,
            center,
        );

        this.nSides = nSides;
        this.depth = depth;
        this.detune = detune;
        this.rotatePhase = rotatePhase;

        this.params.push(
            this.nSides,
            this.depth,
            this.detune,
            this.rotatePhase
        );

        this.params.forEach(o => o.getObservable().subscribe((v) => {
            this.regenGeoPlanet();
        }));

        this.regenGeoPlanet();

    }


    setNSides(nSides: number) {
        this.nSides.updateValue(nSides);
    }

    setDepth(depth: number) {
        this.depth.updateValue(depth);
    }

    setRotatePhase(phase: number) {
        this.rotatePhase.updateValue(phase);
    }

    subTick(time: number): PlanetPackage {
        let gp = this.p.subTick(time);

        //Keep this for now, but I don't like it. 
        gp.colorPoints.forEach((v, i) => {
            this.positions[i].updateFromPosition(v.position);
        });

        return gp;
    }

}