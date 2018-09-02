import { DrawModule } from './../models/DrawModule';
import { TraceMaker } from './../models/TraceMaker';
import { GeoPlanetModel } from './../models/GeoPlanetModel';
import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { RenderMap } from "./internal/RenderMap";
import { ColorParameter } from "../parameters/ColorParameter";
import { Color, ClearAll, DrawableObject, Position } from "blacksheep-geometry";
import { DrawPackage } from "./internal/DrawPackage";
import { LinkMatrix } from "../models/LinkMatrix";
import { PulseLinkMatrix } from '../models/PulseLinkMatrix';





export class ThreeOrbitsGeo extends AbstractAlgorithm {

  p1 = new GeoPlanetModel();
  p2 = new GeoPlanetModel();
  p3 = new GeoPlanetModel();

  linkMatrix = new DrawModule();

  constructor() {
    super("three-orbits-geo");


    this.p2.setCenter(this.p1.getPosition());
    this.p3.setCenter(this.p2.getPosition());

    this.p1.setRenderHint(true, true, true, true, true, true, true);
    this.p2.setRenderHint(true, true, true, true, true, true, true);
    this.p3.setRenderHint(true, true, true, true, true, true, true);
    this.linkMatrix.setRenderHint(true, true, false, true, false, false, false, false);

    this.params = [
      ...this.linkMatrix.getRenderParams(),
      ...this.p1.getRenderParams(),
      ...this.p2.getRenderParams(),
      ...this.p3.getRenderParams(),
    ];

    this.randomParams = [
      ...this.linkMatrix.getRandomParams(),
      ...this.p1.getRandomParams(),
      ...this.p2.getRandomParams(),
      ...this.p3.getRandomParams()
    ];
    this.clearParams = this.params;

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

    paints.push(...this.linkMatrix.getTraces(this.t, ...positions));

    return {
      0: paints,
      1: previews,
    }

  }



}
