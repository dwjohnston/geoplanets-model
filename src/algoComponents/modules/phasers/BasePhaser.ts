import {Parameter} from "../../../Parameter";

/***

  Base Phaser

  Has a single speed parameter, and returns the phase (a value between 0 - 2pi). Phase is increased on tick().

*/
export class BasePhaser {


  baseSpeed: Parameter; 
  speedParam: Parameter; 
  initPhase: number; 
  phase: number; 
  previousPhase: number; 


  constructor(speedParam : Parameter, baseSpeed: Parameter,  initPhase :number = 0){

    this.speedParam = speedParam;
    this.baseSpeed = baseSpeed;
    this.initPhase = initPhase;
    this.phase =initPhase; 
    this.previousPhase =initPhase; 

    this.reset();
  }

  reset() {

    this.phase = this.initPhase;
    this.previousPhase = ((Math.PI * 2) - this.speedParam.getValue() * Math.PI) % (2* Math.PI);

  }

  tick() {

    this.previousPhase = this.phase;
    let realSpeed = this.speedParam.getValue() / this.baseSpeed.getValue();
    this.phase +=  ((realSpeed/1000) * Math.PI) ;
		this.phase = (this.phase + 2*Math.PI)   % (2*Math.PI);

  }


  getPreviousPhase() :number{
    return this.previousPhase;
  }
  getPhase() :number {
    return this.phase;
  }

}


export default BasePhaser; 
