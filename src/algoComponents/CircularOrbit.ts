import {
    AbstractParameter
} from "../AbstractParameter";
import {
    Position
} from "../../../blacksheep-geometry/lib";
import {
    SimpleParameter
} from "../SimpleParameter";
// import {
//     AbstractOrbit
// } from "./AbstractOrbit";
import {
    SinePhaser, sinePhase
} from "./modules/phasers/SinePhaser";



export function circularOrbit(time : number, initPhase : number, center : Position, speed : number, distance :number) : Position{

    let x = sinePhase(time, speed, initPhase, distance); 
    let y = sinePhase(time, speed, initPhase + (Math.PI * 0.5), distance); 

    return new Position(center.x + x, center.y + y); 
}

// export class CircularOrbit extends AbstractOrbit {



//     xPhaser: SinePhaser;
//     yPhaser: SinePhaser;

//     constructor(
//         label: string,
//         speed: SimpleParameter,
//         baseSpeed: SimpleParameter,
//         distance: SimpleParameter,
//         center: Position, 
//         initPhase: number, 
//         nPositions: SimpleParameter
//     ) {

//         super(label, speed, distance, center,  initPhase, nPositions);



//         this.xPhaser = new SinePhaser(
//             this.speed,
//             baseSpeed,
//             this.distance, 
//              this.currentPhase,
//         );
//         this.yPhaser = new SinePhaser(
//             this.speed,
//             baseSpeed,
//             this.distance,
//             0.5 * Math.PI
//         );

//         this.resetParams.push(this.xPhaser, this.yPhaser);
//         this.tickables.push(this.xPhaser, this.yPhaser);

//     }


//     tick() {
//         this.xPhaser.tick();
//         this.yPhaser.tick(); 
//         super.tick();
//     }

//     calcPositions(){

// 		let x, y;

// 		x = this.center.x;
// 		y = this.center.y;


//         for (let i = 0; i< this.nPositions.getValue(); i++) {
//             this.previousPositionsList[i].update(
//                 this.positionsList[i].x,
//                 this.positionsList[i].y
//             ); 
            
//             this.positionsList[i].update(
//                 x + this.xPhaser.getValue(),
//                 y + this.yPhaser.getValue(),
//             );
//         }

// 		return this.positionsList;
// 	}

// }