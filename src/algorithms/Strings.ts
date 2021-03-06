import { DrawModule } from './../models/DrawModule';
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
import { PulseLinkMatrix } from '../models/PulseLinkMatrix';

export class Strings extends AbstractAlgorithm {

    center = new Position(0.5, 0.5);
    p1 = createUnmovingPolygon(8, 0.5, this.center, new Color(255, 255, 255, 0.5), Math.PI / 8);
    p2 = new ConvexFlowerModel();
    p3 = new ConvexFlowerModel();


    linkMatrix = new DrawModule();


    firstRandom = true;

    constructor() {
        super("strings");

        this.p2.setRenderHint(true, true, true, true, true, true, true, true);
        this.p3.setRenderHint(true, true, true, true, true, true, true, true);

        this.linkMatrix.setRenderHint();



        this.p2.setColor(new Color(255, 100, 100, 0.5));
        this.p2.setDistance(0.4);
        this.p2.setNSides(8);
        this.p2.setDepth(4);

        this.p3.setColor(new Color(255, 100, 100, 0.5));
        this.p3.setDistance(0.3);
        this.p3.setNSides(4);
        this.p3.setDepth(3);
        this.p3.setRotatePhase((85 * Math.PI) / 256);

        this.linkMatrix.traceMaker.drawRate.value = 1;
        this.linkMatrix.traceMaker.size.value = 0.05;

        this.clearParams = [
            ...this.linkMatrix.getRenderParams(),
            ...this.p2.getRenderParams(),
            ...this.p3.getRenderParams()
        ];
        this.randomParams = [
            ...this.linkMatrix.getRandomParams(),
            ...this.p2.getRandomParams(),
            ...this.p3.getRandomParams()
        ]


        super.initClearFunctions();
    }

    randomize() {
        if (this.firstRandom) {
            this.firstRandom = false;
        } else {
            super.randomize();
        }
    }


    getRenderHint() {

        return {
            "global": super.baseHint(),
            "links": this.linkMatrix.getRenderHint(),
            "p2": this.p2.getRenderHint(),
            "p3": this.p3.getRenderHint()


        }
    }

    subTick(): DrawPackage {




        let gp = combinePackages([
            this.p1,
            this.p2,
            this.p3
        ], this.t);


        let links = this.linkMatrix.getLinks(this.t, ...gp.colorPoints);

        let res = {
            0: [...this.linkMatrix.getTraces(this.t, ...gp.colorPoints), ...links],
            1: gp.previews,
        }
        return res;
    }


}