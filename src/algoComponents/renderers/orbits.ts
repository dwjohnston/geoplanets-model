import {Circle, DrawableObject, Color, Position}
 from 'blacksheep-geometry';


export function makeOrbitPreview(center: Position, distance: number): DrawableObject {
    return new Circle(distance, new Color(255, 255, 255, 0.2), center, false);

}		

