import { DrawModule } from './../models/DrawModule';
import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { DrawPackage } from './internal/DrawPackage';
import { GeoPlanetModel } from "../models/GeoPlanetModel";
import { ColorParameter } from '../parameters/ColorParameter';
import { Color, ClearAll, DrawableObject } from "blacksheep-geometry";
import { StaticParameter } from "../parameters/StaticParameter";
import { LinkMatrix } from "../models/LinkMatrix";
import { PulseLinkMatrix } from "../models/PulseLinkMatrix";
/***

Separation of concerns.

Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
export class GeoPlanetsTwo extends AbstractAlgorithm {



  p1: GeoPlanetModel = new GeoPlanetModel(
  );
  p2: GeoPlanetModel = new GeoPlanetModel(
  );
  p3: GeoPlanetModel = new GeoPlanetModel(
  );

  color: ColorParameter;

  linker = new DrawModule();

  constructor() {
    super("geo-planets-2");

    this.params.push(...this.p1.params);
    this.params.push(...this.p2.params);
    this.params.push(...this.linker.getParams());


    this.p1.setRenderHint();
    this.p2.setRenderHint();
    this.linker.setRenderHint();


    this.color = this.p1.color;

    (<any>Object).entries(this.p2).forEach(([key, value]) => {
      this.p3[key] = value;
    });

    this.p3.initPhase = new StaticParameter<number>("init-phase", Math.PI);

    this.randomParams = this.params;
    this.clearParams = this.params;

    this.initClearFunctions();
  }


  getRenderHint() {

    return {
      "global": super.baseHint(),
      "links": this.linker.getRenderHint(),
      "p1": this.p1.getRenderHint(),
      "p2": this.p2.getRenderHint(),
    }
  }

  subTick(): DrawPackage {


    let gp1 = this.p1.subTick(this.t);
    let gp2 = this.p2.subTick(this.t);
    let gp3 = this.p3.subTick(this.t);

    let previews: DrawableObject[] = [new ClearAll(new Color(0, 0, 0, 0))];
    let paints = [];

    previews.push(...gp1.previews, ...gp2.previews, ...gp3.previews);
    let positions = [...gp1.colorPoints, ...gp2.colorPoints, ...gp3.colorPoints];

    paints = this.linker.getLinks(this.t,
      ...positions
    );


    return {
      0: paints,
      1: previews
    };



  }
}

