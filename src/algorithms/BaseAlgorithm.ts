import {AlgorithmInterface} from "./AlgorithmInterface";

import {
  Parameter
} from "../Parameter";

import {
  Color,
  ClearAll
} from 'blacksheep-geometry';
import {
  ColorParameter
} from "../ColorParameter";
import {
  AbstractParameter
} from "../AbstractParameter";

import {PlanetParameter, Planet} from "../algoComponents/Planet"; 
import {Linker} from "../algoComponents/Linker";
import { DrawPackage } from "../DrawPackage";
import { DrawableObject } from "blacksheep-geometry";


export interface DrawFunction {
  () : DrawableObject; 
}

export interface DrawFunctionMap {
  [key : number] : DrawFunction[]; 
}

export class BaseAlgorithm extends AlgorithmInterface {

  globalSpeed: Parameter;
  baseSpeed: Parameter;
  baseColor: ColorParameter;

  planets: PlanetParameter[];
  linkers: Linker[];

  tickables: AbstractParameter < any > [];    // Parameters which - if algorithm ticks, these params should tick. 
  resetParams: AbstractParameter < any > []; // Parameters which - if algorithm resets, these params should reset
  clearParams: AbstractParameter < any > []; // Parameters which - if they've changed, should clear the whole thing
  randomParams: AbstractParameter < any > []; // Parameters which - if randomize() is called - should be randomized 




  drawPackage: DrawPackage; 
  drawFunctionMap :DrawFunctionMap;
  constructor(
    label : string, 
    globalSpeed: Parameter = new Parameter(1, 50, 1, 1, "super-speed"),
    baseSpeed: Parameter = new Parameter(1, 8, 1, 6, "base-speed"),
    baseColor: ColorParameter = new ColorParameter("bg-color", new Color(0, 0, 0, 1))
  ) {

    super(label);

    this.globalSpeed = globalSpeed;
    this.baseSpeed = baseSpeed;
    this.baseColor = baseColor;

    this.planets = [];
    this.linkers = [];

    this.tickables = [];
    this.resetParams = []; 
    this.clearParams = [];
    this.randomParams = []; 

    this.drawPackage  = {

    }; 


    this.drawFunctionMap  = {
      0: [],
      1: []

    }

    /**
    Structure should look like this:

    And the functions will be called on each tick

    //   this.renderMap = {
    //   0: [someFunction, someFunction]
    //   1: [someFunction, someFunction]
    //
    // }
    */

  }


  toJson() {

  }

  randomize() {
    this.randomParams.forEach((p: AbstractParameter < any > ) => p.randomize());
  }

  reset() {
    this.resetParams.forEach((p: AbstractParameter < any > ) => p.reset());
  }

  initPaintClearFunction() {
    this.clearParams = [].concat(this.planets).concat([this.baseColor, this.baseSpeed]);

  }

  /***
  I'm just going to chuck this here for now.


  It's the basic rendering for all planets and linkers.
  ***/
  initDrawFunctions() {

    let paints = this.planets.reduce((acc : DrawFunction[], cur : PlanetParameter) => {
        return acc.concat([cur.getPaint.bind(cur)]);
      }, [])
      .concat(this.linkers.reduce((acc : DrawFunction[], cur : Linker) => {
        return acc.concat([cur.getSprite.bind(cur)]);
      }, []));

    let previews = this.planets.reduce((acc : DrawFunction[], cur : PlanetParameter) => {
      return acc.concat([cur.getPreview.bind(cur), cur.getOrbitPreview.bind(cur)]);
    }, [() => {
      return new ClearAll();
    }]);

    this.drawFunctionMap = {
      0: previews,
      1: paints,
    }
  }


  // getParams() {
  //   return [this.settingsPanel];
  // }

  tick() : DrawPackage {
    let draws : DrawPackage = {};

    for (const key of Object.keys(this.drawFunctionMap)) {
      draws[key] = [];
    }
    for (let i = 0; i < this.globalSpeed.getValue(); i++) {

      this.tickables.forEach((t: AbstractParameter<any>) => t.tick());

      for (let key of Object.keys(this.drawFunctionMap)) {

        for (let fn of this.drawFunctionMap[key]) {
          draws[key] = draws[key].concat(fn());
        }

      }




    }

    console.log(draws); 
    return draws;

  }

}