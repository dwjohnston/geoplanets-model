
import { DrawableObject, ColorPoint } from 'blacksheep-geometry';
import { Position } from 'blacksheep-geometry';
import { getRegularPolygon } from '../orbits';
import { Color } from 'blacksheep-geometry';
import { makeRegularPolygonOrbit } from '../renderers/orbits';
import { makePlanetPreview } from '../renderers/tracers';
import { basePhase } from '../modules/phasers/BasePhaser';
import { AbstractParameter } from '../../parameters/AbstractParameter';
import { ColorParameter } from '../../parameters/ColorParameter';
import { SimpleParameter } from '../../parameters/SimpleParameter';
import { DrawPackage } from '../../DrawPackage';
import { RenderHint } from '../../RenderMap';

export interface GeoplanetPackage {

    previews: DrawableObject[];
    colorPoints: ColorPoint[];
}

export interface ParameterMap {
    [key: string]: AbstractParameter<any>
}

export class GeoPlanetModel {
    speed: AbstractParameter<number> = new SimpleParameter(-10, 10, 0.1, 1, "speed");
    distance:  AbstractParameter<number> = new SimpleParameter(0, 0.5, 0.1, 0.25, "distance");
    color:  AbstractParameter<Color> = new ColorParameter("color", new Color(255, 255, 255, 1));
    nSides:  AbstractParameter<number> = new SimpleParameter(2, 5, 1, 3, "nSides");
    rotateSpeed:  AbstractParameter<number> = new SimpleParameter(-10, 10, 0.1, 1, "rotate-speed");
    center = new Position(0.5, 0.5);

    initPhase : AbstractParameter<number> = new  SimpleParameter(Math.PI * -1, Math.PI, 0.1, 0, "initial-phase");
    initRotatePhase : AbstractParameter<number>= new  SimpleParameter(Math.PI * -1, Math.PI, 0.1, 0, "initial-rotate-phase");


    params: AbstractParameter<any>[];

    constructor(
        color: boolean = true,
        speed: boolean = true,
        distance: boolean = true,
        rotateSpeed: boolean = true,
        nSides: boolean = true,
        initRotatePhase: boolean = true,
        initPhase: boolean = true,
    ) {

        let allParams = [
            this.color,
            this.speed,
            this.distance,
            this.rotateSpeed,
            this.nSides,
            this.initRotatePhase,
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
    subTick(time: number): GeoplanetPackage {
        let adjustSpeed = this.speed.getValue() / 1000;
        let adjustRotateSpeed = this.rotateSpeed.getValue() / 1000;

        console.log(this.initPhase); 
        let gp = getGeoPlanetPackage(
            time,
            this.initPhase.getValue(),
            adjustSpeed,
            this.distance.getValue(),
            this.center,
            this.nSides.getValue(),
            this.color.getValue(),
            this.initRotatePhase.getValue(),
            adjustRotateSpeed
        );

        return gp;
    }

}

export function createGeoPlanetParameters(

    color: boolean = true,
    speed: boolean = true,
    distance: boolean = true,
    rotateSpeed: boolean = true,
    nSides: boolean = true,
    initRotatePhase: boolean = true,
    initPhase: boolean = true,


): ParameterMap {


    const params = [{
        color: new ColorParameter("color", new Color(255, 255, 255, 1))
    },
    {
        speed: new SimpleParameter(-10, 10, 0.1, 1, "speed")
    },

    {
        distance: new SimpleParameter(0, 0.5, 0.1, 0.25, "distance")
    },

    {
        rotateSpeed: new SimpleParameter(-10, 10, 0.1, 1, "rotate-speed")

    },

    {
        nSides: new SimpleParameter(2, 5, 1, 3, "rotate-speed")

    },

    {
        initRotatePhase: new SimpleParameter(Math.PI * -1, Math.PI, 0.1, 0, "initial-rotate-phase")

    },

    {
        initRotatePhase: new SimpleParameter(Math.PI * -1, Math.PI, 0.1, 0, "initial-phase")

    }];

    var args = Array.from(arguments);
    let obj = {};
    args.forEach((v, i) => {
        if (v) {
            obj = Object.assign(obj, params[i]);
        }
    });

    return obj;


}

export function getGeoPlanetPackage(
    time: number,
    initPhase: number,
    speed: number,
    distance: number,
    center: Position,
    nSides: number,

    color: Color,

    initRotationPhase: number,
    rotationSpeed: number, 

    nPositions = 1, 
    positionArc = Math.PI * 2, 
): GeoplanetPackage {

    let poly = getRegularPolygon(
        center,
        distance,
        basePhase(time, rotationSpeed, initRotationPhase),
        nSides, 
    );


    let positions = []; 
    for (let i of Array(nPositions).keys()) {
        positions.push(poly.getPoint(basePhase(time, speed, initPhase+ i * (positionArc/nPositions))));
    }

    return {
        previews: [
            makeRegularPolygonOrbit(poly),
            ...positions.map(pos => makePlanetPreview(pos, color))
        ],
        colorPoints: [
            ...positions.map(pos => new ColorPoint(pos, color ))
        ]
    }

}