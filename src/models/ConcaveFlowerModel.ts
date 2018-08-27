import { AbstractModel } from './AbstractModel';
import { RenderHint } from './../../lib/algorithms/RenderMap.d';
import { PlanetPackage } from './AbstractPlanetModel';
import { GeoPlanetModel } from './GeoPlanetModel';
import { AbstractParameter } from "../parameters/AbstractParameter";
import { SimpleParameter } from "../parameters/SimpleParameter";
import { getStandardDistance, getStandardColor, } from "../standard/parameters";
import { Position } from "blacksheep-geometry";
import { createConvexFlower, createConcaveFlower } from '../standard/shapes';



export class ConcaveFlowerModel extends AbstractModel {

    nSides: AbstractParameter<number> = new SimpleParameter(3, 15, 2, 3, "n-sides");
    distance = getStandardDistance();
    depth = new SimpleParameter(2, 5, 1, 2, "depth");
    color = getStandardColor();
    center = new Position(0.5, 0.5);


    params: AbstractParameter<any>[];


    p: GeoPlanetModel;

    regenGeoPlanet() {
        this.p = createConcaveFlower(
            this.nSides.getValue(),
            this.distance.getValue(),
            this.center,
            this.depth.getValue(),
            this.color.getValue()
        );
    }

    constructor(
        nSides: boolean,
        distance: boolean,
        depth: boolean,
        color: boolean
    ) {

        super();
        let allParams: AbstractParameter<any>[] = [
            this.nSides,
            this.distance,
            this.color,
            this.depth
        ];



        var args = Array.from(arguments);
        this.params = [];
        args.forEach((v, i) => {
            if (v) {
                this.params.push(allParams[i]);
                allParams[i].getObservable().subscribe(v => {
                    this.regenGeoPlanet();
                });
            }
        });

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
        return this.p.subTick(time);
    }
}