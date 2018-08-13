import { PlanetParameter } from "../algoComponents/Planet";
import {Linker} from "../algoComponents/Linker";

import {
  Color,
  Position
} from 'blacksheep-geometry';
import {
  BaseAlgorithm
} from "./BaseAlgorithm";

/***

*/
export class ThreeOrbits extends BaseAlgorithm {


  center: Position;
  p1: PlanetParameter;
  p2: PlanetParameter;
  p3: PlanetParameter;

  getParams() {
    return this.planets;
  }

  constructor() {

    //BaseAlgorithm basically sets up some standard reusable functionality, that can be overridden if you wish.
    super("three-orbits");


    //Define a center point
    let center = new Position(0.5, 0.5);

    //Define three planets with their initial speeds, distances and colors - and set the center of each one as the previous planet's position
    //Planet constructor(speed, distance, color, center, label, phase =0) {
    this.p1 = new PlanetParameter(

    );
    this.p2 = new PlanetParameter(

    );
    this.p3 = new PlanetParameter(
    );

    this.planets = [this.p1, this.p2, this.p3];


    //Add some linkers
    //Linker constructor(o1, o2, linkrate = 10) {
    this.linkers = [
      new Linker(this.p1, this.p2, 3),
      new Linker(this.p2, this.p3, 3),
      new Linker(this.p1, this.p3, 3),
    ];


    //Tell it all the planets need to tick
    this.tickables = this.tickables.concat(this.planets);


    //Use default BaseAlgorithm clearing and rendering
    //ie. clear whenever a control changes
    //ie. render orbit preview, planet preview, planet paint, all linkers.
    super.initPaintClearFunction();
    super.initDrawFunctions();

  }

}

