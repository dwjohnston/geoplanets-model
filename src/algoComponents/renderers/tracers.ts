import {     Position, Color, DrawableObject, Circle
} from 'blacksheep-geometry';

export function makePlanetPreview(position: Position, color: Color): DrawableObject {
    return new Circle(0.02, color.shift(50, 0.5), position, false, 2);
}

export function makePlanetDot(position : Position, color: Color) {
    return new Circle(0.004, color, position, true, 2);

}