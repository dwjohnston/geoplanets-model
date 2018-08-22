
import { SimpleParameter } from '../parameters/SimpleParameter';
import { ColorParameter } from '../parameters/ColorParameter';
import { Color, DrawableObject, GradientLine, ColorPoint, ClearAll } from '../../../blacksheep-geometry/lib';
import { Position } from '../../../blacksheep-geometry/lib';
import { circularOrbit, regularPolygonOrbit } from '../functions/positioners/orbits';
import { AbstractAlgorithm } from './AbstractAlgorithm';
import { makeOrbitPreview } from '../functions/renderers/orbits';
import { makePlanetPreview } from '../functions/renderers/tracers';
import { makeLink } from '../functions/renderers/links';
import { DrawPackage } from './internal/DrawPackage';







export class Test extends AbstractAlgorithm {


    center = new Position(0.5, 0.5);

    speed: SimpleParameter;
    distance: SimpleParameter;
    color: ColorParameter;
    baseColor: ColorParameter; 

    constructor() {


        super("test");
        this.speed = new SimpleParameter(-42, 42, 1, 10, "speed");
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
            "global" : super.baseHint(),           

            "p1" : {
                type: "planet",
                params: this.params, 
                color: this.color
            }
        }
    }


    subTick() : DrawPackage {
            let tAdjust = this.t; 
            let speedAdjust = this.speed.getValue() / 4200; 

            let positionA = circularOrbit(tAdjust, 0, this.center, speedAdjust, this.distance.getValue());
            //let positionB = circularOrbit(tAdjust, 2, this.center, speedAdjust, this.distance.getValue());
            let positionB = regularPolygonOrbit(tAdjust, Math.PI * 0.5, this.center, speedAdjust, this.distance.getValue() * 0.5, 3, 0);
    
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