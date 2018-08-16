import { Position, Polygon, AbstractPolygon } from 'blacksheep-geometry';
import {
	sinePhase
} from "./modules/phasers/SinePhaser";
import { basePhase } from './modules/phasers/BasePhaser';



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




	// 	//hack because of super calling this calcPosition
	// 	if (this.nSides !== undefined) {
	// 		let nSides = this.nSides.getValue();
	// 		this.previousPosition.update(this.position.x, this.position.y);
	// 		// let poly = new Polygon(this.distance.getValue(), this.color, this.center, nSides, this.rotatePhase, false);

	// 		let poly = this.getCurrentOrbit();

	// 		let position = poly.getPoint(this.planetPhaser.getPhase());

	// 		this.position.update(
	// 			position.x, position.y
	// 		);

	// 		return this.position;
	// 	}

	// 	else {
	// 		super.calcPosition();
	// 	}


	// }

	// getOrbitPreview() {
	// 	let circle =super.getOrbitPreview();
	// 	//  constructor(nsides=3, size=1, phase=0, position = new Position(0,0)) {
	// 	let polygon = new Polygon(new AbstractPolygon(
	// 		this.nSides.getValue(),
	// 		this.distance.getValue(),
	// 		this.rotatePhaser.getPhase(),
	// 		this.center),  this.color, false);

	// 	return [circle, polygon];
	// }
