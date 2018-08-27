import { ConcaveFlowerModel } from './../models/ConcaveFlowerModel';
import { GeoPlanetModel } from './../models/GeoPlanetModel';

import { ConvexFlowerModel } from './../models/ConvexFlowerModel';
import { DrawPackage } from './internal/DrawPackage';
import { AbstractAlgorithm } from './AbstractAlgorithm';
import { createUnmovingPolygon, createConcaveFlower, createConvexFlower } from '../standard/shapes';
import { Color, Position } from 'blacksheep-geometry';
import { combinePackages } from '../models/AbstractPlanetModel';
import { makePlanetDots } from '../functions/renderers/tracers';
import { SimpleParameter } from '../parameters/SimpleParameter';

export class TestTwo extends AbstractAlgorithm {

    center = new Position(0.5, 0.5);
    p1 = createUnmovingPolygon(3, 0.3, this.center, new Color(255, 100, 100, 1));
    p2 = new ConcaveFlowerModel(true, true, true, true); 
    p3 = new ConvexFlowerModel(true, true, true, true);

    constructor() {
        super("test-two");



        this.clearParams = [...this.p2.params, ...this.p3.params];

        this.superSpeed.value = 10000;


        super.initClearFunctions();
    }



    getRenderHint() {

        return {
            "global": super.baseHint(),

            "p2": this.p2.getRenderHint(),
            "p3": this.p3.getRenderHint()


        }
    }

    subTick(): DrawPackage {


        let gp = combinePackages([this.p1, this.p2, this.p3], this.t);

        
        return {
            0: makePlanetDots(gp.colorPoints),
            1: gp.previews,
        }
    }


}