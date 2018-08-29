import { GeoPlanetModel } from './../models/GeoPlanetModel';
import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { RenderMap } from "./internal/RenderMap";
import { ColorParameter } from "../parameters/ColorParameter";
import { Color, ClearAll, DrawableObject, Position } from "blacksheep-geometry";
import { DrawPackage } from "./internal/DrawPackage";
import { LinkMatrix } from "../models/LinkMatrix";





export class ThreeOrbitsGeo extends AbstractAlgorithm {

  p1 = new GeoPlanetModel(true, true, true, true, true, true, true, new Position(0.5, 0.5));
  p2 = new GeoPlanetModel(true, true, true, true, true, true, true, this.p1.getPosition());
  p3 = new GeoPlanetModel(true, true, true, true, true, true, true, this.p2.getPosition());

  linkMatrix: LinkMatrix;
  constructor() {
    super("three-orbits-geo")


    this.params = [
      this.linkRate,
      ...this.p1.params,
      ...this.p2.params,
      ...this.p3.params
    ];

    console.log(this);
    this.linkMatrix = new LinkMatrix(this.linkRate);

    this.randomParams = this.params;
    this.clearParams = this.params;

    this.initClearFunctions();
  }

  getRenderHint(): RenderMap {
    return {
      "global": super.baseHint(),
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
