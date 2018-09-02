import { DrawModule } from './../models/DrawModule';
import { SimpleParameter } from "../parameters/SimpleParameter";
import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { DrawPackage } from './internal/DrawPackage';
import { getGeoPlanetPackage, GeoPlanetModel } from "../models/GeoPlanetModel";
import { Color, ClearAll, DrawableObject, ColorPoint, Position } from "blacksheep-geometry";
import { LinkMatrix } from "../models/LinkMatrix";
import { PulseLinkMatrix } from "../models/PulseLinkMatrix";
import { SPEED_DIVISOR } from '../MagicNumbers';

/***

Separation of concerns.

Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
export class NGeo extends AbstractAlgorithm {



  p1: GeoPlanetModel = new GeoPlanetModel(
  );
  p2: GeoPlanetModel = new GeoPlanetModel(
  );

  nPlanets = new SimpleParameter(2, 4, 1, 2, "n-planets");
  arc = new SimpleParameter(0, 2 * Math.PI, 0.01, Math.PI * 2, "arc");

  nPlanets2 = new SimpleParameter(2, 4, 1, 2, "n-planets");


  linker = new DrawModule();

  constructor() {
    super("n-geo");

    this.p1.params.push(this.nPlanets, this.arc);
    this.p2.params.push(this.nPlanets2);

    this.params = [...this.linker.getParams()];
    this.params.push(...this.p1.params);
    this.params.push(...this.p2.params);

    this.p1.setRenderHint(true, true, true, true, true, true, true, true, true);
    this.p2.setRenderHint(true, true, true, true, true, true, true, true);
    this.linker.setRenderHint();

    this.randomParams = this.params;
    this.clearParams = this.params;

    this.initClearFunctions();
  }


  getRenderHint() {

    let p1 = this.p1.getRenderHint();

    return {
      "global": super.baseHint(),
      "linker": this.linker.getRenderHint(),
      "p1": p1,
      "p2": this.p2.getRenderHint(),
    }
  }

  subTick(): DrawPackage {


    let gp1 = getGeoPlanetPackage(
      this.t,
      this.p1.initPhase.getValue(),
      this.p1.speed.getValue() / SPEED_DIVISOR,
      this.p1.distance.getValue(),
      this.p1.getCenter(),
      this.p1.nSides.getValue(),
      this.p1.color.getValue(),
      this.p1.initRotatePhase.getValue(),
      this.p1.userRotateSpeed.getValue() / SPEED_DIVISOR,
      this.nPlanets.getValue(),
      this.arc.getValue(),
    );

    let gp2 = {
      previews: [],
      colorPoints: []
    };

    gp1.colorPoints.forEach((cp: ColorPoint) => {


      let pgp = getGeoPlanetPackage(
        this.t,
        this.p2.initPhase.getValue(),
        this.p2.speed.getValue() / SPEED_DIVISOR,
        this.p2.distance.getValue(),
        cp.position,
        this.p2.nSides.getValue(),
        this.p2.color.getValue(),
        this.p2.initRotatePhase.getValue(),
        this.p2.userRotateSpeed.getValue() / SPEED_DIVISOR,
        this.nPlanets2.getValue(),
        Math.PI * 2,
      );
      gp2.previews.push(...pgp.previews);
      gp2.colorPoints.push(...pgp.colorPoints);

    });

    let previews: DrawableObject[] = [new ClearAll(new Color(0, 0, 0, 0))];
    let paints = [];

    previews.push(...gp1.previews, ...gp2.previews);
    let positions = [...gp1.colorPoints, ...gp2.colorPoints];

    paints = this.linker.getTraces(this.t,
      ...positions
    );

    //paints = positions.map((cp: ColorPoint) => makePlanetDot(cp.position, cp.color)); 


    return {
      0: paints,
      1: previews
    };



  }
}

