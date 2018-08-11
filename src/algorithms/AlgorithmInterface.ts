import { AbstractParameter } from "../AbstractParameter";
import { RenderMap } from "../RenderMap";
import { DrawPackage } from "../DrawPackage";

/*
Again, just defining an interface/way of doing things here.
*/

export class AlgorithmInterface {


  label: string; 
  params: AbstractParameter<any>[]; 

  constructor(label: string) {

    this.label = label;
    this.params = []; //These are just the parameters to be rendered on the screen and controled by the user.
    //You can still have other parameters defined.

    /*
    All this.params objects must be some kind of ParameterContainer object.

    eg. ParameterContainer
    Planet
    LfoPlanet

    This is so they render to be tabs.

    */

  }

  getParams() : AbstractParameter<any>[]{
    throw new Error("This method should be overridden by extending class");

    return [];
  }

  tick() : DrawPackage {  //TODO: switch these to the drawable interface
    throw new Error("This method should be overridden by extending class");
  }


  getRenderMap() : RenderMap {
    throw new Error ("Render map not implmented"); 
  }

}

