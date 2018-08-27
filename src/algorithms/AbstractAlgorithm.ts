import { AbstractParameter } from '../parameters/AbstractParameter';
import { ClearAll, Color } from "blacksheep-geometry";
import { DrawPackage } from './internal/DrawPackage';
import { SimpleParameter } from '../parameters/SimpleParameter';
import { ColorParameter } from '../parameters/ColorParameter';
import { RenderHint } from './internal/RenderMap';


export class AbstractAlgorithm {


    t: number;
    label: string;
    params: AbstractParameter<any>[];       // Params to be rendered 
    clearParams: AbstractParameter<any>[] = [];  // Params that should clear the whole thing
    randomParams: AbstractParameter<any>[] = []; // Params that will be randomized; 


    superSpeed: AbstractParameter<number> = new SimpleParameter(1, 100, 1, 5, "super-speed");
    linkRate : AbstractParameter<number> = new SimpleParameter(1, 20, 1, 5, "link-rate"); 
    baseColor = new ColorParameter("base-color", new Color(0, 0, 0, 1));


    requiresClear: boolean = true;



    constructor(label: string) {
        this.label = label;
        this.t = 0;

        this.params = [this.superSpeed, this.baseColor, this.linkRate];
    }


    tick(): DrawPackage {

        if (this.requiresClear) {

            console.log("requires clear");

            this.requiresClear = false;
            this.t = 0; 
            return {
                0: [new ClearAll()],
                1: [new ClearAll()]
            };
        }

        else {

            let results = {
                0: [], 
                1: []
            }; 

            for (let i of Array(this.superSpeed.getValue())) {
                this.t++;
                let ret =  this.subTick();
                results[0].push(...ret[0]); 
                results[1].push(...ret[1]); 
            }
            return results; 
        }
    }

    baseHint() : RenderHint {
        return {
            type: "icon",
            icon: "cog",
            params: [this.superSpeed, this.linkRate, this.baseColor]
          }; 
    }

    subTick(): DrawPackage {
        throw "subtick not implmented";
    }

    getParams() {
        return this.params;
    }


    randomize() {
        this.randomParams.forEach((p: AbstractParameter<any>) => p.randomize());
    }

    initClearFunctions() {
        this.clearParams.forEach((p: AbstractParameter<any>) => {

            p.getObservable().subscribe((v: any) => {
                this.requiresClear = true;
            })
        });
    }


    requestClear() {
        this.requiresClear = true;
    }


}