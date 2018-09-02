import { SPEED_DIVISOR, DETUNE_DIVISOR, FLOWER_SPEED_DIVISOR } from './../MagicNumbers';
import { Color, Position } from 'blacksheep-geometry';
import { GeoPlanetModel } from "../models/GeoPlanetModel";


export function createUnmovingPolygon(
    nSides: number,
    distance: number,
    center: Position,
    color: Color,
    phaseOffset: number = 0
): GeoPlanetModel {


    let model = new GeoPlanetModel();
    model.setCenter(center);
    model.setNSides(nSides);
    model.setDistance(distance);
    model.setColor(color);
    model.setInitPhase(phaseOffset);
    model.setRotateSpeed(0);

    return model;

}

export function createConcaveFlower(
    nSides: number,
    distance: number,
    center: Position,
    depth: number,
    color: Color,
    speed: number,
    rotatePhase: number,
    detune = 0,
): GeoPlanetModel {

    let model = new GeoPlanetModel();
    let n = (nSides - depth);
    if (n <= 0) n = 1;
    let ratio = ((depth - 1) * n + 1) / (n + depth - 1);
    ratio = ratio * (1 + (detune / DETUNE_DIVISOR));


    model.setDistance(distance);
    model.setColor(color);
    model.setNSides(depth);
    model.setCenter(center);
    model.setInitRotatePhase(rotatePhase);


    let adjSpeed = ((speed / FLOWER_SPEED_DIVISOR) / ratio) - 1;
    model.setRotateSpeed(1 * adjSpeed);
    model.setSpeed(ratio * adjSpeed);
    return model;
}

export function createConvexFlower(
    nSides: number,
    distance: number,
    center: Position,
    depth: number,
    color: Color,
    speed: number,
    rotatePhase: number,
    detune = 0,


): GeoPlanetModel {

    let model = new GeoPlanetModel();

    let n = nSides - depth;
    if (n <= 0) n = 1;
    let ratio = (n + depth) / n; //Magic from wolfram alpha!
    ratio = ratio * (1 + (detune / DETUNE_DIVISOR));

    model.setDistance(distance);
    model.setColor(color);
    model.setNSides(depth);
    model.setCenter(center);
    model.setInitRotatePhase(rotatePhase);

    let adjSpeed = ((speed / FLOWER_SPEED_DIVISOR)) / (ratio - 1);

    model.setRotateSpeed(-1 * adjSpeed);
    model.setSpeed(ratio * adjSpeed);

    return model;
}