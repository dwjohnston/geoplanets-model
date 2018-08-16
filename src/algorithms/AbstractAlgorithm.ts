import { AbstractParameter } from '../parameters/AbstractParameter';
import {  ClearAll } from "blacksheep-geometry";
import { DrawPackage } from '../DrawPackage';


export class AbstractAlgorithm {


    t: number; 
    label: string; 
    params: AbstractParameter<any>[];       // Params to be rendered 
    clearParams: AbstractParameter<any>[];  // Params that should clear the whole thing
    randomParams: AbstractParameter<any>[]; // Params that will be randomized; 

    requiresClear: boolean = true; 



    constructor(label : string) {
        this.label = label; 
        this.t = 0; 
    }


    tick() : DrawPackage{
        this.t++;


        if (this.requiresClear) {

            console.log("requires clear"); 

            this.requiresClear = false; 
            return {
                0: [new ClearAll()], 
                1: [new ClearAll()]
            };
        }
        else {
            return this.subTick(); 
        }    
    }

    subTick() : DrawPackage {
        throw "subtick not implmented"; 
    }

    getParams() {
        return this.params; 
    }


    randomize() {
        this.randomParams.forEach(( p: AbstractParameter<any>) => p.randomize()); 
    }

    initClearFunctions() {
        this.clearParams.forEach((p :AbstractParameter<any>) => {

            p.getObservable().subscribe((v: any) => {
                this.requiresClear = true; 
            })
        }); 
    }


    requestClear() {
        this.requiresClear = true; 
    }


}