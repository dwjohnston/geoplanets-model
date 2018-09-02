import { SimpleParameter } from "../parameters/SimpleParameter";
import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { DrawPackage } from './internal/DrawPackage';
import { getGeoPlanetPackage } from "../models/GeoPlanetModel";
import { makeLink, makeLink2 } from "../functions/renderers/links";
import { ColorParameter } from '../parameters/ColorParameter';
import { Position, Color, ClearAll, DrawableObject } from "blacksheep-geometry";


/**
 * 
 * 
 * Nb, this one is using manual calls of functions etc, but it's working, sooo. 
 */
export class GeoPlanets extends AbstractAlgorithm {



  speed: SimpleParameter;
  distance: SimpleParameter;
  color: ColorParameter;
  baseColor: ColorParameter;
  nSides: SimpleParameter;
  rotateSpeed: SimpleParameter;
  center = new Position(0.5, 0.5);


  constructor() {
    super("geo-planets");


    this.speed = new SimpleParameter(-42, 42, 1, 10, "speed");
    this.distance = new SimpleParameter(0, 0.5, 0.01, 0.25, "distance");
    this.color = new ColorParameter("color", new Color(255, 100, 50, 1));
    this.baseColor = new ColorParameter("color", new Color(100, 100, 50, 1));
    this.rotateSpeed = new SimpleParameter(-42, 42, 1, 10, "rotate-speed");
    this.nSides = new SimpleParameter(2, 5, 1, 3, "nSides");

    this.params = [
      this.speed, this.distance, this.color, this.rotateSpeed, this.nSides
    ];

    this.randomParams = this.params;
    this.clearParams = this.params;


    this.initClearFunctions();
  }


  getRenderHint() {

    return {
      "global": {
        type: "icon",
        icon: "cog",
        params: [this.baseColor]
      },


      "p1": {
        type: "planet",
        params: this.params,
        color: this.color
      }
    }
  }

  subTick(): DrawPackage {
    let speedAdjust = this.speed.getValue() / 4200;
    let rSpeedAdjust = this.rotateSpeed.getValue() / 4200;



    let gp = getGeoPlanetPackage(
      this.t,
      0,
      speedAdjust,
      this.distance.getValue(),
      this.center,
      this.nSides.getValue(),
      this.color.getValue(),
      0,
      rSpeedAdjust
    );

    let gp2 = getGeoPlanetPackage(
      this.t,
      0,
      speedAdjust * -1,
      this.distance.getValue(),
      this.center,
      this.nSides.getValue(),
      this.color.getValue(),
      0,
      rSpeedAdjust * -1

    );
    let all = []

    all.push(new ClearAll(new Color(144, 0, 0, 0.1)));
    all.push(...gp.previews, ...gp2.previews);
    return {
      1: all,
      0: [makeLink2(
        gp.colorPoints[0],
        gp2.colorPoints[0]
      )]

    }


  }
}

