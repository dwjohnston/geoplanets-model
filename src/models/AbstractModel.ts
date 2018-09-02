import { PlanetPackage } from './AbstractPlanetModel';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { AbstractParameter } from '../parameters/AbstractParameter';


export class AbstractModel {



    protected params: AbstractParameter<any>[] = [];
    protected renderBools: boolean[] = [];
    protected renderParams: AbstractParameter<any>[] = [];


    setRenderHint(...boolean) {

        if (arguments.length === 0) {
            this.renderParams = this.params;
            return;
        }

        if (arguments.length != this.params.length) {
            throw `setRenderHint(...boolean) needs to be called with the exact number of params that the algorithm contains, in the exact order.
            You called with ${arguments.length} arguments, for an algorithm with ${this.params.length} params.
            If you call setRenderHint() with no arguments, all params will be add to the render list.`
        }

        let args = [...arguments];

        this.renderParams = [];


        args.forEach((v, i) => {
            if (v) {
                this.renderParams.push(this.params[i]);
            }
        });


    }

    getRenderParams(): AbstractParameter<any>[] {
        return this.renderParams;
    }

    getRandomParams(): AbstractParameter<any>[] {
        return this.renderParams;
    }

    getRenderHint(): RenderHint {
        throw "getRenderHint() not implemented.";
    }
    subTick(time: number): PlanetPackage {

        throw "subtick() not implemented";
    }

    getParams() {
        return this.params;
    }

}

