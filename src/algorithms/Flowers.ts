import { DrawModule } from './../models/DrawModule';
import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { CircularPlanetModel } from "../models/CircularPlanetModel";
import { RenderMap } from "./internal/RenderMap";
import { Color, ClearAll, DrawableObject, Position } from "blacksheep-geometry";
import { DrawPackage } from "./internal/DrawPackage";

import { ConvexFlowerModel } from '../models/ConvexFlowerModel';
import { ConcaveFlowerModel } from '../models/ConcaveFlowerModel';





export class Flowers extends AbstractAlgorithm {



  p1 = new ConvexFlowerModel();
  p2 = new CircularPlanetModel();
  p3 = new ConcaveFlowerModel();


  linkMatrix = new DrawModule();

  constructor() {
    super("flowers")

    this.p1.setRenderHint();
    this.p2.setRenderHint();
    this.p3.setRenderHint();

    this.linkMatrix.setRenderHint(true, true, false, true, false, true, true, true);

    this.params = [
      ...this.p1.getParams(),
      ...this.p2.getParams(),
      ...this.p3.getParams(),

      ...this.linkMatrix.getParams(),
    ];

    this.clearParams = this.params;
    this.randomParams = [
      ...this.p1.getRandomParams(),
      ...this.p2.getRandomParams(),
      ...this.p3.getRandomParams(),

      ...this.linkMatrix.getRandomParams()
    ]

    this.initClearFunctions();
  }

  getRenderHint(): RenderMap {
    return {
      "global": super.baseHint(),
      "link": this.linkMatrix.getRenderHint(),
      "p2": this.p2.getRenderHint(),

      "p1": this.p1.getRenderHint(),
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

    let paints = [
      ...this.linkMatrix.getLinks(this.t, ...positions),
      ...this.linkMatrix.getTraces(this.t, ...positions)
    ];

    return {
      0: paints,
      1: previews,
    }

  }



}
