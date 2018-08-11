import {Parameter} from "../../../Parameter";
import {BasePhaser} from "./BasePhaser";

/***

 Sine Phaser

 
  Get a given value between -1 * distance and 1 * distance, increase on tick. 


  If you want a cos phaser, use Math.PI * 0.5 as init phase. 

*/
export class SinePhaser
 {
  distance: Parameter; 
  speed: Parameter; 
  baseSpeed: Parameter; 
  basePhaser: BasePhaser; 

  initPhase: number; 

  value: number; 

  constructor(
    speedParam : Parameter,
    baseSpeed = new Parameter(1, 25, 1, 6, "base-speed"),
    distance = new Parameter(0, 1, 0.001, 1, "distance"),
    initPhase = 0){

    this.speed = speedParam;
    this.baseSpeed = baseSpeed; 
    this.initPhase = initPhase;
    this.value = 0; 
    this.basePhaser = new BasePhaser(
      this.speed,
      this.baseSpeed,
      this.initPhase); 
    this.distance = distance; 
    this.reset();
  }

  reset() {
    this.basePhaser.reset();
    this.calcValue();
  }

  calcValue() {
    this.value = Math.sin(this.basePhaser.getPhase()) * this.distance.getValue();
  }

  tick() {
    this.basePhaser.tick(); 
    this.calcValue();
  }

  getValue() :number {
    return this.value; 
  }


  getPhaser() : BasePhaser{
    return this.basePhaser; 
  }

}


