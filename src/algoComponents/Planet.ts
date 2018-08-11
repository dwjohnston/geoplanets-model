import {Parameter} from '../Parameter';
import {Circle, Position, Color, Line} from 'blacksheep-geometry';
import {SinePhaser} from "./modules/phasers/SinePhaser";
import { ColorParameter } from '../ColorParameter';
import { CircularOrbit } from './CircularOrbit';
import { AbstractParameter } from '../AbstractParameter';

export interface Planet {
	colors: Color[]; 
	positions: Position[]; 
}

export class PlanetParameter extends AbstractParameter<Planet>  {

	orbit: CircularOrbit; 
	color: ColorParameter; 
	

	constructor(
		label  = "nolabel",
		baseSpeed : Parameter = new Parameter(1, 1, 1, 1, "base-speed"),
		speed: Parameter = new Parameter(-24, 24, 1, 1, "speed"), 
		distance : Parameter = new Parameter(0.01, .5, 0.01, 0.3, "distance"), 
		color : ColorParameter = new Color(0,0,0,1),
		center : Position = new Position(0, 0),
		// phase =0 
	) {

		super(label); 
		
		this.orbit = new CircularOrbit(
			"orbit", 
			speed, 
			baseSpeed, 
			distance, 
			center, 
			phase, 
			new Parameter(1, 1, 1, 1, "nPlanets")
		); 
		this.color = color; 


		this.tickables = [this.orbit]; 
		this.resetParams = [this.orbit]; 
		this.clearParams = [this.orbit, this.color]; 
		this.randomParams = [this.orbit, this.color]; 


		this.initialiseClearEventSubscriptions();
	}




	getCenter() {
		return this.orbit.getCenter();
	}



	getPreviousPosition() : Position {
		return this.orbit.getPreviousPositions()[0]
	}
	getPosition() {
		this.orbit.getPositions()[0]; 
	}

	getPaint() {
		//return new Circle(this.radius, this.color, this.position);

		return new Line(
			this.getPreviousPosition(),
			this.getPosition(),
			this.color.getValue(),
		3);

	}

	getPreview() {
		return new Circle(this.radius*4, this.color.shift(50,0.5), this.position, false, 2);
	}

	getOrbitPreview() {
		return new Circle(this.distance.getValue(), new Color(255,255,255,0.2), this.center, false);
	}

}

