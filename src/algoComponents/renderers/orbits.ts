import {Circle, DrawableObject, Color, Position, AbstractPolygon, Polygon}
from 'blacksheep-geometry';


export function makeOrbitPreview(center: Position, distance: number): DrawableObject {
    return new Circle(distance, new Color(255, 255, 255, 0.2), center, false);

}		

export function makeRegularPolygonOrbit(poly: AbstractPolygon) : DrawableObject {
    return new Polygon(poly,new Color(255, 255, 255, 0.2), false, 1); 
}