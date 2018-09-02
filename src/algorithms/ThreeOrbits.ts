import { DrawModule } from './../models/DrawModule';
import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { CircularPlanetModel } from "../models/CircularPlanetModel";
import { RenderMap } from "./internal/RenderMap";
import { ColorParameter } from "../parameters/ColorParameter";
import { Color, ClearAll, DrawableObject, Position } from "blacksheep-geometry";
import { DrawPackage } from "./internal/DrawPackage";
import { LinkMatrix } from "../models/LinkMatrix";
import { PulseLinkMatrix } from "../models/PulseLinkMatrix";





export class ThreeOrbits extends AbstractAlgorithm {



  p1 = new CircularPlanetModel();
  p2 = new CircularPlanetModel();
  p3 = new CircularPlanetModel();

  linkMatrix = new DrawModule();

  constructor() {
    super("three-orbits")

    this.p1.setRenderHint(true, true, false, true);
    this.p2.setRenderHint(true, true, false, true);
    this.p3.setRenderHint(true, true, false, true);
    this.linkMatrix.setRenderHint(true, true, false, true, false, false, false, false);

    this.p2.setCenter(this.p1.getPosition());
    this.p3.setCenter(this.p2.getPosition());

    this.params = [
      ...this.p1.getRenderParams(),
      ...this.p2.getRenderParams(),
      ...this.p3.getRenderParams(),
      ...this.linkMatrix.getRenderParams(),
    ];

    this.clearParams = this.params;
    this.randomParams = this.params;
    this.initClearFunctions();
  }

  getRenderHint(): RenderMap {
    return {
      "global": super.baseHint(),
      "link": this.linkMatrix.getRenderHint(),
      "p1": this.p1.getRenderHint(),
      "p2": this.p2.getRenderHint(),
      "p3": this.p3.getRenderHint(),

    }
  }


  subTick(): DrawPackage {

    let gp1 = this.p1.subTick(this.t);
    let gp2 = this.p2.subTick(this.t);
    let gp3 = this.p3.subTick(this.t);


    let previews: DrawableObject[] = [new ClearAll(new Color(0, 0, 0, 0))];

    previews.push(...gp1.previews, ...gp2.previews, ...gp3.previews);
    let positions = [...gp1.colorPoints, ...gp2.colorPoints, ...gp3.colorPoints];

    let paints = this.linkMatrix.getLinks(this.t,
      ...positions
    );

    return {
      0: paints,
      1: previews,
    }

  }



}
/***

*/
// export class ThreeOrbits  {


//   center: Position;
//   p1: PlanetParameter;
//   p2: PlanetParameter;
//   p3: PlanetParameter;

//   getParams() {
//     return this.planets;
//   }

//   constructor() {

//     //BaseAlgorithm basically sets up some standard reusable functionality, that can be overridden if you wish.
//     //super("three-orbits");


//     //Define a center point
//     let center = new Position(0.5, 0.5);

//     //Define three planets with their initial speeds, distances and colors - and set the center of each one as the previous planet's position
//     //Planet constructor(speed, distance, color, center, label, phase =0) {
//     this.p1 = new PlanetParameter(

//     );
//     this.p1.setCenter(center); 
//     this.p2 = new PlanetParameter(

//     );

//     this.p2.setCenter(this.p1.getPosition()); 
//     this.p3 = new PlanetParameter(
//     );
//     this.p3.setCenter(this.p2.getPosition()); 

//     this.planets = [this.p1, this.p2, this.p3];


//     //Add some linkers
//     //Linker constructor(o1, o2, linkrate = 10) {
//     this.linkers = [
//       new Linker(this.p1, this.p2, 3),
//       new Linker(this.p2, this.p3, 3),
//       new Linker(this.p1, this.p3, 3),
//     ];

//     this.clearParams = this.planets; 


//     //Tell it all the planets need to tick
//     this.tickables = this.tickables.concat(this.planets);


//     //Use default BaseAlgorithm clearing and rendering
//     //ie. clear whenever a control changes
//     //ie. render orbit preview, planet preview, planet paint, all linkers.
//     this.initialiseClearEventSubscriptions();
//     super.initDrawFunctions();

//   }




// }


//   tick() : DrawPackage{
//     let re =     super.tick(); 
//     return re; 

//   }

// }

