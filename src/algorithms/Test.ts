
import { AbstractParameterJson, AbstractParameter } from '../AbstractParameter';
import { SimpleParameter } from '../SimpleParameter';
import { ColorParameter } from '../ColorParameter';
import { Color, DrawableObject, GradientLine, ColorPoint, ClearAll } from 'blacksheep-geometry';
import { Position } from 'blacksheep-geometry';
import { circularOrbit } from '../algoComponents/CircularOrbit';
import { Circle } from 'blacksheep-geometry';
import { AbstractAlgorithm } from './AbstractAlgorithm';



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


export class Test extends AbstractAlgorithm {


    center = new Position(0.5, 0.5);

    speed: SimpleParameter;
    distance: SimpleParameter;
    color: ColorParameter;
    baseColor: ColorParameter; 

    constructor() {


        super("test");
        this.speed = new SimpleParameter(0, 100, 1, 10, "speed");
        this.distance = new SimpleParameter(0, 0.5, 0.01, 0.25, "distance");
        this.color = new ColorParameter("color", new Color(255, 100, 50, 1));
        this.baseColor = new ColorParameter("color", new Color(100, 100, 50, 1)); 


        this.params = [
            this.speed, this.distance, this.color
        ]; 

        this.randomParams = this.params;
        this.clearParams = this.params; 



        this.initClearFunctions(); 

    }


    getRenderHint() {

        return {
            "global" :  {
                type: "icon", 
                icon: "cog", 
                params: []
            }, 

            "p1" : {
                type: "planet",
                params: this.params, 
                color: this.color
            }
        }
    }


    tick() {
        this.t++;


        if (this.requiresClear) {
            this.requiresClear = false; 
            return {
                0: [new ClearAll()], 
                1: [new ClearAll()]
            };
        }
        else {
            let tAdjust = this.t /1000; 
            let positionA = circularOrbit(tAdjust, 0, this.center, this.speed.getValue(), this.distance.getValue());
            let positionB = circularOrbit(tAdjust, Math.PI * 0.5, this.center, this.speed.getValue() * 2, this.distance.getValue() * 0.5);
    
            return {
                1: [
                new ClearAll(new Color(144, 0, 0, 0.1)),
                makeOrbitPreview(this.center, this.distance.getValue()),
                makeOrbitPreview(this.center, this.distance.getValue() * 0.5),
                makePlanetPreview(positionA, this.color.getValue()),
                makePlanetPreview(positionB, this.color.getValue())],
                0: [makeLink(positionA, this.color.getValue(), positionB, this.color.getValue())]
            }
    
        }

    }


}