
import {StagePhaser} from "../phasers/StagePhaser";
import MathJs from 'mathjs';
import {Position} from "../../../../../blacksheep-geometry/lib";
import { Parameter } from "../../../Parameter";

export class GoldenRectanglePositioner {

  speed: Parameter; 
  distance: Parameter; 
  center: Position; 

  stagePhaser: StagePhaser;
  myPhi: number; 

  currentSize: number; 
  currentPosition: Position; 
  previousPosition: Position; 
  previousPositionStartCorner : Position; 

  constructor(
    speed : Parameter,
    distance : Parameter,
    center : Position,
    stagePhaser : StagePhaser
  ){
    this.speed = speed;
    this.distance = distance;
    this.center = center;
    this.stagePhaser = stagePhaser;
    this.myPhi = MathJs.phi;  //We are setting phi here - so we can play around with change the value of it later.

    this.currentSize =0; 

    this.reset();
  }

  reset() {
    this.stagePhaser.reset();
    this.currentSize = this.distance.getValue();
    this.currentPosition = new Position(this.center.x + this.currentSize * this.myPhi /2, this.center.y - this.currentSize/2);
    this.previousPosition =new Position( this.center.x + this.currentSize * this.myPhi /2, this.center.y - this.currentSize/2); //TODO: change this. To what? Jesus, this comment makes no sense
  }

  tick() {
    this.stagePhaser.tick();

    let subPhase = this.stagePhaser.getSubPhase();
    let previousSubPhase = this.stagePhaser.getPreviousSubPhase();
    let stage = this.stagePhaser.getStage();

    let subPhaseDiff, subPhaseDiffB;
    if (!this.stagePhaser.isOnCorner()) {
      subPhaseDiff = subPhase - previousSubPhase;

    }
    else {


      /***
        This block sets the previousPositionStartCorner, and moves current position to the corner.

        Also, increases the value of currentSize

      */

      subPhaseDiffB = 1 - previousSubPhase;
      subPhaseDiff = subPhase;

      this.previousPositionStartCorner = this.currentPosition.copy();

      switch (stage) {
        case 0:
          this.currentPosition.update(this.currentPosition.x + subPhaseDiffB * this.currentSize, this.currentPosition.y);
        break;
        case 1:
          this.currentPosition.update(this.currentPosition.x, this.currentPosition.y + subPhaseDiffB * this.currentSize);
        break;
        case 2:
          this.currentPosition.update(this.currentPosition.x - subPhaseDiffB * this.currentSize, this.currentPosition.y );
        break;
        case 3:
          this.currentPosition.update(this.currentPosition.x, this.currentPosition.y - subPhaseDiffB * this.currentSize);
        break;
      }


      this.currentSize = this.currentSize * this.myPhi;
    }

		this.previousPosition.updateFromPosition(this.currentPosition);

		switch(stage){
			case 0:
				this.currentPosition.update(this.currentPosition.x, (this.currentPosition.y + subPhaseDiff * this.currentSize)) ;
			break;
			case 1:
				this.currentPosition.update(this.currentPosition.x - (subPhaseDiff * this.currentSize), this.currentPosition.y );
			break;
			case 2:
			  this.currentPosition.update(this.currentPosition.x, this.currentPosition.y - (subPhaseDiff * this.currentSize)) ;
			break;
			case 3:
				this.currentPosition.update(this.currentPosition.x + (subPhaseDiff * this.currentSize), this.currentPosition.y );
			break;
		}



  }

  //Return a single position
  getPosition() : Position {
    return this.currentPosition;
  }

  getPreviousPosition() : Position{
    return this.previousPosition;
  }

  getStartCorner() : Position {
    return this.previousPositionStartCorner;
  }

  getMyPhi() : number{
    return this.myPhi;
  }

}

