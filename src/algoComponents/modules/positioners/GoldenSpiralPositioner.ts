
import {pointOnCircle, Position} from "blacksheep-geometry"; 
import { GoldenRectanglePositioner } from './GoldenRectanglePositioner';


class GoldenSpiralPositioner {


  goldenRectanglePositioner: GoldenRectanglePositioner; 

  curvePointQueue: Position[]; 
  currentCurvePoint: Position; 
  currentCurvePosition: Position; 
  previousCurvePosition: Position; 
  currentCurveRadius: number; 
  currentCurveLength: number; 
  currentSize: number; 
  curvePhaseAdjust: number; 
  constructor(goldenRectanglePositioner : GoldenRectanglePositioner) {

    this.goldenRectanglePositioner = goldenRectanglePositioner;

    this.curvePointQueue = [];
    this.currentCurvePoint = null;
    this.currentCurvePosition = null;
    this.previousCurvePosition =null; 

    this.currentCurveRadius= 0;
    this.currentSize = 0; 
    this.curvePhaseAdjust = 0; 
    this.currentCurveLength = 0; 
  }



  reset() {

    this.goldenRectanglePositioner.reset();

      this.curvePointQueue = [];
      this.currentCurvePoint = null;
      this.currentCurvePosition = null;
      this.currentCurveRadius= null;

    //TODO
    //There's an OO confusion here. Is it the responsibility of the GoldenSpiralPositioner to reset (and also tick) the GoldenRectanglePositioner?
    //I'm saying yes for now.
  }

  tick() {
    this.goldenRectanglePositioner.tick();

    let myPhi =this.goldenRectanglePositioner.getMyPhi();
    let subPhase = this.goldenRectanglePositioner.stagePhaser.getSubPhase();
    let previousSubPhase = this.goldenRectanglePositioner.stagePhaser.getPreviousSubPhase();
    let invertMyPhi = 1 - (1/myPhi);

    /**
      On corner:
      Just add the curve point
    */
    if (this.goldenRectanglePositioner.stagePhaser.isOnCorner()){

      this.curvePointQueue.push(this.goldenRectanglePositioner.getPreviousPosition().copy());

    }

    /**
      Moving from 1/myPhi of the curve phase:
      Change the curve point
    */

    if (previousSubPhase < invertMyPhi && subPhase > invertMyPhi ) {
      if (this.curvePointQueue.length > 3 ) {
          this.currentCurvePoint = this.curvePointQueue.shift();
          this.currentCurvePosition = pointOnCircle(
            this.currentCurvePoint,
            this.currentSize/(myPhi),
            (this.goldenRectanglePositioner.stagePhaser.getPhase()) * (Math.PI / 2)
          );


          this.currentCurveLength = this.goldenRectanglePositioner.currentSize / (myPhi * myPhi);
          this.curvePhaseAdjust = (this.goldenRectanglePositioner.stagePhaser.getStage() -1) * (Math.PI / 2);
      }
    }


    /**
      If there's a curve point:
      Draw the curve
    */
    if (this.currentCurvePoint) {

      //Curve phase:
      //If subphase is 0 - 1/myPhi = 0.5-1 of curvePhase
      // subphase is 1/myPhi to 1  = 0.0 to 0.5 of curvePhase.

      let curvePhase = ( subPhase < invertMyPhi) ? 0.5 + 0.5 *  (subPhase / ( invertMyPhi)) : 0.5 * ((subPhase - invertMyPhi)/(1/myPhi ))  ; //0-1

      let center = this.currentCurvePoint;

      this.previousCurvePosition = this.currentCurvePosition.copy();

      this.currentCurvePosition = pointOnCircle(
        center,
        this.currentCurveLength,
        this.curvePhaseAdjust + curvePhase * (Math.PI /2)
      );

  }


  }


  getPosition() : Position{
    return this.currentCurvePosition;
  }

  getPreviousPosition() : Position {
    return this.previousCurvePosition;
  }



}

export default GoldenSpiralPositioner;
