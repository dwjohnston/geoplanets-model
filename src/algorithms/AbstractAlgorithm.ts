
import { AbstractParameterJson, AbstractParameter } from '../AbstractParameter';
import { SimpleParameter } from '../SimpleParameter';
import { ColorParameter } from '../ColorParameter';
import { Color, DrawableObject, GradientLine, ColorPoint } from 'blacksheep-geometry';
import { Position } from 'blacksheep-geometry';
import { circularOrbit } from '../algoComponents/CircularOrbit';
import { Circle } from 'blacksheep-geometry';



export function makePlanetPreview(position: Position, color: Color): DrawableObject {

    return new Circle(0.02, color.shift(50, 0.5), position, false, 2);

}

export function makeOrbitPreview(center: Position, distance: number): DrawableObject {
    return new Circle(distance, new Color(255, 255, 255, 0.2), center, false);

}

export function makeLink(p1: Position, c1: Color, p2: Position, c2: Color): DrawableObject {
    return new GradientLine(
        new ColorPoint(
            p1,
            c1
        ),
        new ColorPoint(
            p2,
            c2
        )
    );
}


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


    tick() {
        throw ("tick() not implmented."); 
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


}