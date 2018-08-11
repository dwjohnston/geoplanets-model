import {BasePhaser} from './BasePhaser';
/****

  Stage Phaser

  For a given BasePhaser and nStages, tell me what stage the phase is at.

**/
export class StagePhaser{

  basePhaser: BasePhaser; 
  nStages: number; 

  piLength: number; 

  stage: number; 
  previousStage: number; 
  subPhase:number; 
  previousSubPhase: number; 

  constructor(basePhaser: BasePhaser, nStages : number) {
    this.basePhaser = basePhaser;
    this.nStages = nStages;
    this.piLength = (2 * Math.PI) / this.nStages;

    this.stage = 0; 
    this.previousStage =0; 
    this.subPhase = 0; 
    this.previousSubPhase = 0; 
  }

  reset() {
    this.basePhaser.reset();
    this.calcStagesAndSubPhases();
  }


  getPhase() : number {
    return this.basePhaser.getPhase();
  }

  getPreviousPhase() :number {
    return this.basePhaser.getPhase();
  }

  getStage() :number {
    return this.stage;
  }

  getPreviousStage() :number{
    return this.previousStage;
  }

  /**
    SubPhase is a 0-1 value, representing the proporition the point is along a given stage.
  */
  getSubPhase() :number{
    return this.subPhase;
  }

  getPreviousSubPhase() :number {
    return this.previousSubPhase;
  }


  isOnCorner() : boolean {
    return (this.previousSubPhase > this.subPhase);
  }


  calcStagesAndSubPhases() {
    this.previousStage = this.stage;
    this.stage =Math.floor(this.basePhaser.getPhase() / this.piLength);

    this.previousSubPhase = this.subPhase;
    this.subPhase =  (this.basePhaser.getPhase() % this.piLength) /this.piLength;
  }

  tick() {
    this.basePhaser.tick();
    this.calcStagesAndSubPhases();
  }


}


