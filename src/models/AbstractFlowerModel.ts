import { AbstractModel } from './AbstractModel';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { PlanetPackage, AbstractPlanetModel } from './AbstractPlanetModel';
import { GeoPlanetModel } from './GeoPlanetModel';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { SimpleParameter } from "../parameters/SimpleParameter";
import { getStandardDistance, getStandardColor, } from "../standard/parameters";
import { Position } from "blacksheep-geometry";
import { createConvexFlower, createConcaveFlower } from '../standard/shapes';



export class AbstractFlowerModel extends AbstractPlanetModel {

    nSides: AbstractParameter<number> = new SimpleParameter(3, 15, 2, 3, "n-sides");
    depth = new SimpleParameter(2, 5, 1, 2, "depth");
    detune = new SimpleParameter(-0.1, 0.1, 0.01, 0, "detune");

    params: AbstractParameter<any>[];


    p: GeoPlanetModel;

    regenGeoPlanet() {
        throw new Error("regenGeoPlanet() not implemnted")
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
    ) {

        super(color, speed, distance, initPhase, center);

        let allParams: AbstractParameter<any>[] = [
            this.nSides,
            this.depth,
            this.detune
        ];


        let args = [nSides, depth, detune];
        args.forEach((v, i) => {
            if (v) {
                this.params.push(allParams[i]);
            }
        });


        this.params.forEach(o => o.getObservable().subscribe(() => {
            this.regenGeoPlanet();

        }));

        this.regenGeoPlanet();

    }

    getRenderHint(): RenderHint {
        return {
            type: "planet",
            params: this.params,
            color: this.color
        }
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