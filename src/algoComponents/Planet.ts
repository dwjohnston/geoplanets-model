import {Parameter} from '../Parameter';
import {Circle, Position, Color, Line} from "blacksheep-geometry";
import {SinePhaser} from "./modules/phasers/SinePhaser";
import { ColorParameter } from '../ColorParameter';
import { CircularOrbit } from './CircularOrbit';
import { AbstractParameter } from '../AbstractParameter';
import { DrawableObject } from 'blacksheep-geometry';

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
		color : ColorParameter = new ColorParameter("color", new Color(200,1,0,1)),
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
			0, 
			new Parameter(1, 1, 1, 1, "nPlanets")
		); 
		this.color = color; 


		this.tickables = [this.orbit]; 
		this.resetParams = [this.orbit]; 
		this.clearParams = [this.orbit, this.color]; 
		this.randomParams = [this.orbit, this.color]; 


		this.initialiseClearEventSubscriptions();
	}



	getParams() {
		return [
			this.orbit.getDistance(),
			this.orbit.getSpeed(), 
			this.color
		]
	}


	getCenter() : Position {
		return this.orbit.getCenter();
	}

	getPreviousPosition() : Position {
		return this.orbit.getPreviousPositions()[0]
	}
	getPosition() : Position {
		return this.orbit.getPositions()[0]; 
	}

	getColor() : Color {
		return this.color.getValue();
	}

	setCenter(p: Position) {
		this.orbit.setCenter(p); 
	}

	getPaint() : DrawableObject {
		//return new Circle(this.radius, this.color, this.position);

		return new Line(
			this.getPreviousPosition(),
			this.getPosition(),
			this.color.getValue(),
		3);

	}

	getPreview() : DrawableObject {
		return new Circle(0.02, this.color.getValue().shift(50,0.5), this.getPosition(), false, 2);
	}

	getOrbitPreview() : DrawableObject {
		return new Circle(this.orbit.getDistance().getValue(), new Color(255,255,255,0.2), this.getCenter(), false);
	}

}

