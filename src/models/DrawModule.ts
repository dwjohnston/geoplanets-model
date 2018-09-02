import { RenderHint } from '../algorithms/internal/RenderMap';
import { DrawableObject } from 'blacksheep-geometry';
import { ColorPoint } from 'blacksheep-geometry';
import { TraceMaker } from './TraceMaker';
import { PulseLinkMatrix } from './PulseLinkMatrix';
import { AbstractModel } from './AbstractModel';
import { AbstractParameter } from '../parameters/AbstractParameter';
export class DrawModule extends AbstractModel {


    linkMatrix = new PulseLinkMatrix();
    traceMaker = new TraceMaker();

    constructor() {
        super();

        this.params = [
            ...this.linkMatrix.params,
            ...this.traceMaker.params
        ];
    }


    getRenderHint(): RenderHint {
        return {
            type: "icon",
            params: this.renderParams,
            icon: "pen",
        };
    }


    getRandomParams(): AbstractParameter<any>[] {
        return [
            ...this.linkMatrix.getRandomParams(),
            ...this.traceMaker.getRandomParams(),
        ]
    }


    getLinks(
        time: number,
        ...position: ColorPoint[]
    ): DrawableObject[] {
        return this.linkMatrix.getLinks(time, ...position);
    }

    getTraces(
        time: number,
        ...position: ColorPoint[]
    ): DrawableObject[] {
        return this.traceMaker.getTraces(time, ...position);
    }

}