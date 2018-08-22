import { DrawableObject, ColorPoint, Color, Position } from 'blacksheep-geometry';
import { AbstractParameter } from '../parameters/AbstractParameter';
import { SimpleParameter } from '../parameters/SimpleParameter';
import { ColorParameter } from '../parameters/ColorParameter';
import { RenderHint } from '../algorithms/internal/RenderMap';

export interface PlanetPackage {
    previews: DrawableObject[];
    colorPoints: ColorPoint[];
}

export interface ParameterMap {
    [key: string]: AbstractParameter<any>
}

export function generatePlanetPreview(cp: ColorPoint) {
    
}

export class AbstractPlanetModel {
    speed: AbstractParameter<number> = new SimpleParameter(-10, 10, 0.1, 1, "speed");
    distance:  AbstractParameter<number> = new SimpleParameter(0, 0.5, 0.1, 0.25, "distance");
    color:  AbstractParameter<Color> = new ColorParameter("color", new Color(255, 255, 255, 1)); 
    initPhase : AbstractParameter<number> = new  SimpleParameter(Math.PI * -1, Math.PI, 0.1, 0, "initial-phase");

    center = new Position(0.5, 0.5);

    params: AbstractParameter<any>[];

    constructor(
        color: boolean = true,
        speed: boolean = true,
        distance: boolean = true,
        initPhase: boolean = true,
    ) {

        let allParams = [
            this.color,
            this.speed,
            this.distance, 
            this.initPhase
        ]

        var args = Array.from(arguments);
        this.params = [];
        args.forEach((v, i) => {
            if (v) {
                this.params.push(allParams[i])
            }
        });

    }


    getRenderHint(): RenderHint {
        return {
            type: "planet",
            params: this.params,
            color: this.color
        }
    }
    subTick(time: number): PlanetPackage {

        throw "subtick() not implemented"; 
    }

}