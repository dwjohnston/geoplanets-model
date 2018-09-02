import { AbstractAlgorithm } from "./AbstractAlgorithm";
import { CircularPlanetModel } from "../models/CircularPlanetModel";
import { RenderMap } from "./internal/RenderMap";
import { ColorParameter } from "../parameters/ColorParameter";
import { Color, ClearAll, DrawableObject } from "blacksheep-geometry";
import { DrawPackage } from "./internal/DrawPackage";
import { LinkMatrix } from "../models/LinkMatrix";
import { PulseLinkMatrix } from "../models/PulseLinkMatrix";


export class EarthVenus extends AbstractAlgorithm {



  p1 = new CircularPlanetModel(
  );
  p2 = new CircularPlanetModel(
  );

  firstRandom = true;

  linkMatrix = new LinkMatrix();
  constructor() {
    super("earth-venus")


    this.params = [
      ...this.p1.params,
      ...this.p2.params,
      ...this.linkMatrix.params,
    ];

    this.randomParams = this.params;
    this.clearParams = this.params;

    this.p1.setRenderHint(
      true, true, true, true,
    )

    this.p2.setRenderHint(
      true, true, true, true,
    )

    this.initClearFunctions();
  }

  getRenderHint(): RenderMap {
    return {
      "global": super.baseHint(),
      "link": this.linkMatrix.getRenderHint(),
      "p1": this.p1.getRenderHint(),
      "p2": this.p2.getRenderHint(),

    }
  }


  randomize() {
    if (this.firstRandom) {
      this.p1.userSpeed.value = 13;
      this.p1.distance.value = 0.2;
      this.p1.color.value = new Color(255, 255, 255, 0.3);

      this.p2.userSpeed.value = 8;
      this.p2.distance.value = 0.3;
      this.p2.color.value = new Color(255, 255, 255, 0.3);


      this.linkMatrix.linkRate.updateValue(50);
      this.firstRandom = false;
    }

    else super.randomize();
  }


  subTick(): DrawPackage {

    let gp1 = this.p1.subTick(this.t);
    let gp2 = this.p2.subTick(this.t);

    let previews: DrawableObject[] = [new ClearAll(new Color(0, 0, 0, 0))];

    previews.push(...gp1.previews, ...gp2.previews);
    let positions = [...gp1.colorPoints, ...gp2.colorPoints];

    let paints = this.linkMatrix.getLinks(this.t,
      ...positions
    );

    return {
      0: paints,
      1: previews,
    }

  }



}

