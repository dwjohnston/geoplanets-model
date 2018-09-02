import {
    ColorPoint, Position, Color, DrawableObject, Circle
} from 'blacksheep-geometry';

export function makePlanetPreview(position: Position, color: Color): DrawableObject {
    return new Circle(0.02, color.shift(50, 0.5), position, false, 2);
}

export function makePlanetDot(position: Position, color: Color): DrawableObject {
    return new Circle(0.004, color, position, true, 2);
}

export function makePlanetDots(colorPoints: ColorPoint[], adjustValue = 1): DrawableObject[] {
    return colorPoints.map(cp => {
        cp.color.a = cp.color.a * adjustValue;
        return makePlanetDot(cp.position, cp.color)
    });
}

