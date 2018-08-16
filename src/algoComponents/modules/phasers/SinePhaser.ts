import {
  SimpleParameter
} from "../../../SimpleParameter";
import {
  basePhase, 
  BasePhaser
} from "./BasePhaser";
import {
  AbstractParameter
} from "../../../AbstractParameter";




export function sinePhase(time: number, speed: number, initPhase: number, amplitude: number) : number{
  return Math.sin((initPhase + time) * speed) * amplitude;
}
/***

 Sine Phaser

 
  Get a given value between -1 * distance and 1 * distance, increase on tick. 


  If you want a cos phaser, use Math.PI * 0.5 as init phase. 

*/
export class SinePhaser extends AbstractParameter < number > {
  distance: SimpleParameter;
  speed: SimpleParameter;
  baseSpeed: SimpleParameter;
  basePhaser: BasePhaser;

  initPhase: number;

  value: number;

  constructor(
    speedParam: SimpleParameter,
    baseSpeed = new SimpleParameter(1, 25, 1, 6, "base-speed"),
    distance = new SimpleParameter(0, 1, 0.001, 1, "distance"),
    initPhase = 0) {

    super("");

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

    console.log("reset");
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

  getValue(): number {
    return this.value;
  }

  getPhaser(): BasePhaser {
    return this.basePhaser;
  }

}