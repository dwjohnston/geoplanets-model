import {
    AbstractParameter
} from "../AbstractParameter";
import {
    Position
} from "blacksheep-geometry";
import {
    Parameter
} from "../Parameter";
import {
    AbstractOrbit
} from "./AbstractOrbit";
import {
    SinePhaser
} from "./modules/phasers/SinePhaser";

export class CircularOrbit extends AbstractOrbit {



    xPhaser: SinePhaser;
    yPhaser: SinePhaser;

    constructor(
        label: string,
        speed: Parameter,
        baseSpeed: Parameter,
        distance: Parameter,
        center: Position, 
        initPhase: number, 
        nPositions: Parameter
    ) {

        super(label, speed, distance, center,  initPhase, nPositions);



        this.xPhaser = new SinePhaser(
            this.speed,
            baseSpeed,
            this.distance, 
             this.currentPhase,
        );
        this.yPhaser = new SinePhaser(
            this.speed,
            baseSpeed,
            this.distance,
            0.5 * Math.PI
        );

        this.resetParams.push(this.xPhaser, this.yPhaser);
        this.tickables.push(this.xPhaser, this.yPhaser);

    }


    calcPositions(){

		let x, y;

		x = this.center.x;
		y = this.center.y;


        for (let i = 0; i< this.nPositions.getValue(); i++) {
            this.previousPositionsList[i].update(
                this.positionsList[i].x,
                this.positionsList[i].y
            ); 
            
            this.positionsList[i].update(
                x + this.xPhaser.getValue(),
                y + this.yPhaser.getValue(),
            );
        }
		return this.positionsList;
	}

}