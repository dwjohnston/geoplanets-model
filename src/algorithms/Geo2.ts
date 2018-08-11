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


    this.basePlanet = new GeoPlanet(10, 0.3, new Color(255, 0, 0, 0.2), new Position(0.5, 0.5), "p1", this.baseSpeed,  3, 1); 
    this.numPlanets = new Parameter(2, 6, 1, 2, "Number of planets"); 
    this.secondPlanet = new GeoPlanet(10, 0.3, new Color(255, 0, 0, 0.2), this.basePlanet.getPosition(), "planet-config", this.baseSpeed,  3, 1); 

    this.planets = [
   
    ]

    this.tickables = this.planets;

    this.linkers = [new Linker(this.planets[0], this.planets[1])];

    this.name = "geo2";



    super.initPaintClearFunction();

    super.initRenderMap();


  }

  onChange() {
    super.onChange(); 


    if (this.numPlanets.hasChanged) {
      this.planets = [this.basePlanet]; 
      for (let i = 0; i< this.numPlanets.getValue(); i++) {
       let newPlanet =  Object.assign( Object.create( Object.getPrototypeOf(this.secondPlanet)), this.secondPlanet); 
       newPlanet.planetPhaser.initPhase = (Math.PI *2 ) * (i / this.numPlanets.max); 
       newPlanet.planetPhaser.reset(); 


      }

    }

  }

  getParams() {
    return super.getParams().concat(this.planets);
  }

}

export default GeoPlanets;
