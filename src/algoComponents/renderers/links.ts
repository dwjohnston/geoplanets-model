import { ColorPoint, GradientLine } from 'blacksheep-geometry';
import { Color, DrawableObject, Position } from 'blacksheep-geometry';


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
