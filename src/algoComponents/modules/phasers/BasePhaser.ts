import {SimpleParameter} from "../../../SimpleParameter";

/***

  Base Phaser

  Has a single speed parameter, and returns the phase (a value between 0 - 2pi). Phase is increased on tick().

*/



/**
 * Return a phase between 0-2PI 
 */
export function basePhase(time: number, speed: number, initPhase: number) :number {
  let phase =   (initPhase + (speed * time)) * Math.PI;
  return (phase + 2*Math.PI)   % (2*Math.PI);
}

export class BasePhaser {


  baseSpeed: SimpleParameter; 
  speedParam: SimpleParameter; 
  initPhase: number; 
  phase: number; 
  previousPhase: number; 


  constructor(speedParam : SimpleParameter, baseSpeed: SimpleParameter,  initPhase :number = 0){

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


