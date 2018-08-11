import Parameter from "../Parameter";

import GeoPlanet from "../algoComponents/GeoPlanet";
import Linker from "../algoComponents/Linker";

import {Color, Position, ClearAll} from 'blacksheep-react-canvas';

import AlgorithmInterface from "./AlgorithmInterface";
import BaseAlgorithm from "./BaseAlgorithm";


/***

Separation of concerns.

Parameter objects shouldn't have to worry about how they're being glued to the the DOM?

*/
class GeoPlanets extends BaseAlgorithm {
  constructor(onChangeCallback) {

    super(onChangeCallback);

    this.planets = [
      new GeoPlanet(10, 0.3, new Color(255, 0, 0, 0.2), new Position(0.5, 0.5), "p1", this.baseSpeed,  3, 1),
      new GeoPlanet(5, 0.5, new Color(0, 255, 0, 0.3), new Position(0.5, 0.5), "p2", this.baseSpeed,  5,1)
    ]

    this.tickables = this.planets;

    this.linkers = [new Linker(this.planets[0], this.planets[1])];

    this.name = "geoplanets";



    super.initPaintClearFunction();

    super.initRenderMap();


  }



  getParams() {
    return super.getParams().concat(this.planets);
  }

}

export default GeoPlanets;