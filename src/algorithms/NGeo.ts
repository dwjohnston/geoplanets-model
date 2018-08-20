import { SimpleParameter } from "../parameters/SimpleParameter";
import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { DrawPackage } from '../DrawPackage';
import { getGeoPlanetPackage, ParameterMap, createGeoPlanetParameters, GeoPlanetModel } from "../algoComponents/composites/geoplanet";
import { makeLink } from "../algoComponents/renderers/links";
import { ColorParameter } from '../parameters/ColorParameter';
import { Position, Color, ClearAll ,DrawableObject, ColorPoint} from "blacksheep-geometry";
import {StaticParameter} from "../parameters/StaticParameter"; 
import {LinkMatrix} from "../algoComponents/composites/LinkMatrix"; 
import {makePlanetDot} from "../algoComponents/renderers/tracers"; 
import {fullClone} from "davids-toolbox"; 
/***

Separation of concerns.

Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
export class NGeo extends AbstractAlgorithm {



  p1 : GeoPlanetModel = new GeoPlanetModel(
    true, true, true, true, true, false, false
  ); 
  p2: GeoPlanetModel = new GeoPlanetModel(
    true, true, true, true, true, false, false
  ); 

  nPlanets = new SimpleParameter(2, 6, 1, 2, "n-planets"); 
  arc = new SimpleParameter(0,  2*  Math.PI, 0.01, Math.PI * 2,  "arc"); 

  nPlanets2 = new SimpleParameter(2, 6, 1, 2, "n-planets"); 


  linker : LinkMatrix;   

  constructor() {
    super("n-geo");

    this.linker = new LinkMatrix(this.linkRate); 
    this.p1.params.push(this.nPlanets, this.arc); 
    this.p2.params.push(this.nPlanets2); 

    this.params = [this.linkRate]; 
    this.params.push(...this.p1.params);
    this.params.push(...this.p2.params); 
    this.params.push(this.baseColor); 



    this.randomParams = this.params;
    this.clearParams = this.params;

    this.initClearFunctions(); 
  }


  getRenderHint() {

    let p1 = this.p1.getRenderHint(); 

    return {
      "global": super.baseHint(), 
      "p1": p1,
      "p2": this.p2.getRenderHint(), 
    }
  }

  subTick(): DrawPackage {


    let gp1 = getGeoPlanetPackage(
      this.t, 
      this.p1.initPhase.getValue(), 
      this.p1.speed.getValue()/10000, 
      this.p1.distance.getValue(), 
      this.p1.center, 
      this.p1.nSides.getValue(), 
      this.p1.color.getValue(), 
      this.p1.initRotatePhase.getValue(), 
      this.p1.rotateSpeed.getValue()/1000, 
      this.nPlanets.getValue(), 
      this.arc.getValue(), 
    ); 

    let gp2 = {
      previews: [], 
      colorPoints: []
    }; 
    
    gp1.colorPoints.forEach((cp: ColorPoint) => {


      let pgp  = getGeoPlanetPackage(
        this.t, 
        this.p2.initPhase.getValue(), 
        this.p2.speed.getValue()/10000, 
        this.p2.distance.getValue(), 
        cp.position,
        this.p2.nSides.getValue(), 
        this.p2.color.getValue(), 
        this.p2.initRotatePhase.getValue(), 
        this.p2.rotateSpeed.getValue()/1000, 
        this.nPlanets2.getValue(), 
        Math.PI *2, 
      ); 
      gp2.previews.push(...pgp.previews);
      gp2.colorPoints.push(...pgp.colorPoints);     

    }); 
    
    let previews : DrawableObject[] = [new ClearAll(new Color(0,0,0,0))]; 
    let paints = []; 

    previews.push(...gp1.previews, ...gp2.previews); 
    let positions = [...gp1.colorPoints, ...gp2.colorPoints];

    paints = this.linker.getLinks(this.t, 
      ...positions
    ); 

    //paints = positions.map((cp: ColorPoint) => makePlanetDot(cp.position, cp.color)); 
    

    return {
      0: paints, 
      1: previews
    }; 



  }
}

