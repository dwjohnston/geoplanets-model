
import {GradientLine, ColorPoint, DrawableObject} from 'blacksheep-geometry';
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
    this.p2 = p2;


    this.linkRate = linkrate;
    this.linkCount = 0;

  }


  getSprite() : DrawableObject {

    if (((this.linkCount++) %this.linkRate) ===0){
      let line =  new GradientLine(
        new ColorPoint(
          this.p1.getPosition(), 
          this.p1.getColor()
        ),
        new ColorPoint(
          this.p2.getPosition(),
          this.p2.getColor()
        )
      );
      console.log(line); 
      return line; 
    }
    return;
  }
}


