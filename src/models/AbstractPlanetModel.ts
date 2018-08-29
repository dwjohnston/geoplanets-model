import { AbstractModel } from './AbstractModel';
import { AdjustParameter } from './../parameters/AdjustParam';
import { DrawableObject, ColorPoint, Color, Position, ClearAll } from 'blacksheep-geometry';
import { AbstractParameter } from '../parameters/AbstractParameter';
import { SimpleParameter } from '../parameters/SimpleParameter';
import { ColorParameter } from '../parameters/ColorParameter';
import { RenderHint } from '../algorithms/internal/RenderMap';
import { getStandardSpeed, getStandardDistance, getStandardPhase } from '../standard/parameters';

export interface PlanetPackage {
    previews: DrawableObject[];
    colorPoints: ColorPoint[];
}

export interface ParameterMap {
    [key: string]: AbstractParameter<any>
}

export function generatePlanetPreview(cp: ColorPoint) {

}

export function combinePackages(models: AbstractModel[], time: number): PlanetPackage {


    let previews: DrawableObject[] = [new ClearAll(new Color(0, 0, 0, 0))];
    let positions: ColorPoint[] = [];
    models.forEach((m: AbstractPlanetModel) => {


        let gp = m.subTick(time);


        previews.push(...gp.previews);
        positions.push(...gp.colorPoints)
    });

    return {
        previews: previews,
        colorPoints: positions
    }
}


export function cPackages(packages: PlanetPackage[]): PlanetPackage {

    let previews: DrawableObject[] = [new ClearAll(new Color(0, 0, 0, 0))];
    let positions: ColorPoint[] = [];

    packages.forEach(p => {
        previews.push(...(p.previews));
        positions.push(...(p.colorPoints))
    });

    return {
        previews: previews,
        colorPoints: positions
    }

}

export class AbstractPlanetModel extends AbstractModel {
    speed: AdjustParameter<number> = getStandardSpeed();

    distance: AbstractParameter<number> = getStandardDistance();
    color: AbstractParameter<Color> = new ColorParameter("color", new Color(255, 255, 255, 1));
    initPhase: AbstractParameter<number> = getStandardPhase();

    userSpeed: AbstractParameter<number>;


    protected center: Position;
    protected positions: Position[] = [new Position(0.5, 0.5)];

    params: AbstractParameter<any>[];

    constructor(
        color: boolean = true,
        speed: boolean = true,
        distance: boolean = true,
        initPhase: boolean = true,
        center: Position = new Position(0.5, 0.5),
    ) {
        super();
        this.center = center;

        this.userSpeed = this.speed.param;

        let allParams = [
            this.color,
            this.userSpeed,
            this.distance,
            this.initPhase
        ];



        var args = [color, speed, distance, initPhase];
        this.params = [];
        args.forEach((v, i) => {
            if (v) {
                this.params.push(allParams[i])
            }
        });

    }


    getCenter(): Position {
        return this.center;
    }

    setCenter(position: Position) {
        this.center = position;
    }

    getPosition(index: number = 0): Position {
        return this.positions[index];
    }

    getPositions(): Position[] {
        return this.positions;
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