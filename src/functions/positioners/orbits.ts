import { Position, Polygon, AbstractPolygon } from 'blacksheep-geometry';
import {
	sinePhase
} from "../phasers/SinePhaser";
import { basePhase } from '../phasers/BasePhaser';



export function circularOrbit(time: number, initPhase: number, center: Position, speed: number, distance: number): Position {

	let x = sinePhase(time, speed, initPhase, distance);
	let y = sinePhase(time, speed, initPhase + (Math.PI * 0.5), distance);

	return new Position(center.x + x, center.y + y);
}


export function getRegularPolygon(
	center: Position,
	distance: number,
	rotationalPhaseOffset: number,
	nSides: number
): AbstractPolygon {
	return new AbstractPolygon(nSides, distance, rotationalPhaseOffset, center);
};

export function regularPolygonOrbit(
	time: number,
	initPhase: number,
	center: Position,
	speed: number,
	distance: number,
	nSides: number,
	rotationalPhaseOffset: number
): Position {
	let poly = getRegularPolygon(center, distance, rotationalPhaseOffset, nSides);
	return poly.getPoint(basePhase(time, speed, initPhase));
}

