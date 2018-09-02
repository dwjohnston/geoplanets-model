import { CircularPlanetModel } from './../models/CircularPlanetModel';
import { AbstractPlanetModel } from './../models/AbstractPlanetModel';
import { ConcaveFlowerModel } from './../models/ConcaveFlowerModel';
import { GeoPlanetModel } from './../models/GeoPlanetModel';

import { ConvexFlowerModel } from './../models/ConvexFlowerModel';
import { DrawPackage } from './internal/DrawPackage';
import { AbstractAlgorithm } from './AbstractAlgorithm';
import { createUnmovingPolygon, createConcaveFlower, createConvexFlower } from '../standard/shapes';
import { Color, Position, Circle } from 'blacksheep-geometry';
import { combinePackages, cPackages } from '../models/AbstractPlanetModel';
import { makePlanetDots } from '../functions/renderers/tracers';
import { SimpleParameter } from '../parameters/SimpleParameter';
import { getRegularPolygon } from '../functions/positioners/orbits';

export class TestTwo extends AbstractAlgorithm {

    center = new Position(0.5, 0.5);
    p1 = createUnmovingPolygon(8, 0.4, this.center, new Color(255, 0, 0, 0.5));
    p2: AbstractPlanetModel = new ConcaveFlowerModel();
    p3: AbstractPlanetModel = new ConvexFlowerModel();

    constructor() {
        super("test-two");


        this.p1.color.updateValue(new Color(255, 0, 0, 1));
        this.p2.setRenderHint(true, true, true, true, true, true, true, true);
        this.p3.setRenderHint(true, true, true, true, true, true, true, true);


        this.clearParams = [
            ...this.p1.params,
            ...this.p2.params,
            ...this.p3.params
        ];
        this.randomParams = this.clearParams;

        super.initClearFunctions();
    }



    getRenderHint() {

        return {
            "global": super.baseHint(),
            //"p1": this.p1.getRenderHint(),
            "p2": this.p2.getRenderHint(),
            "p3": this.p3.getRenderHint()


        }
    }

    subTick(): DrawPackage {


        let gp1 = this.p1.subTick(this.t);
        let gp2 = this.p2.subTick(this.t);
        let gp3 = this.p3.subTick(this.t);

        let gp = cPackages([gp1, gp2, gp3]);


        return {
            0: makePlanetDots(gp.colorPoints),
            1: gp.previews,
        }
    }


}