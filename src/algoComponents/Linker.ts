
import {GradientLine, ColorPoint} from 'blacksheep-react-canvas';
import { Position } from 'blacksheep-geometry';
import { PlanetParameter } from './Planet';

export class Linker {

  p1: PlanetParameter; 
  p2: PlanetParameter; 
  linkRate: number; 
  linkCount: number; 
  
  constructor(
    p1: PlanetParameter,
    p2:  PlanetParameter,
     linkrate = 10
    ) {
    this.p1 = p1;
    this.p1 = p1;


    this.linkRate = linkrate;
    this.linkCount = 0;

  }


  getSprite() {

    if (((this.linkCount++) %this.linkRate) ===0){
      return new GradientLine(new ColorPoint(this.p1.getPosition(), this.p1.getColor()), new ColorPoint(this.p1.getPosition(),this.p2.getColor()));

    }

    return;

  }
}


