import { Color, Position } from 'blacksheep-geometry';
import { GeoPlanetModel } from "../models/GeoPlanetModel";

export function createUnmovingPolygon(
    nSides: number,
    distance: number,
    center: Position,
    color: Color,
): GeoPlanetModel {


    let model = new GeoPlanetModel();
    model.color.value = color;
    model.setCenter(center);
    model.nSides.value = nSides;
    model.distance.value = distance;
    model.userRotateSpeed.value = 0;



    return model;

}

export function createConcaveFlower(
    nSides: number,
    distance: number,
    center: Position,
    depth: number,
    color: Color,
    speed: number
): GeoPlanetModel {

    let model = new GeoPlanetModel();
    let n = (nSides - depth);
    if (n === 0) n = 1;
    let ratio = (2 * n + 1) / (n + 2);

    model.color.value = color;
    model.setCenter(center);
    model.nSides.value = depth;
    model.distance.value = distance;
    model.userRotateSpeed.value = 1 * speed;
    model.userSpeed.value = ratio * speed;





    return model;
}

export function createConvexFlower(
    nSides: number,
    distance: number,
    center: Position,
    depth: number,
    color: Color,
    speed: number
): GeoPlanetModel {

    let model = new GeoPlanetModel();

    let n = nSides - depth;
    if (n === 0) n = 1;
    let ratio = (n + depth) / n; //Magic from wolfram alpha!
    model.color.value = color;
    model.setCenter(center);
    model.nSides.value = depth;
    model.distance.value = distance;

    model.userRotateSpeed.value = -1 * speed;
    model.userSpeed.value = ratio * speed;

    return model;
}