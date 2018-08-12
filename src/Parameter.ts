import {randomStep} from '../../davids-toolbox/lib'; 

import {AbstractParameter} from "./AbstractParameter"; 



export class Parameter extends AbstractParameter<number> {


  min: number; 
  max: number; 
  step: number; 
  init: number; 
  value: number; 



  constructor(min: number, max :number, step :number, init :number, label: string){
    super(label);
    this.min = min;
    this.max = max;
    this.step = step;
    this.init = init; 
    this.value = init;
    this.label = label;

  }

  getValue() : number{
    return this.value;
  }

  randomize() {
    this.value = randomStep (this.min, this.max,  this.step); 
    this.updateValue(this.value); 
  }


  setMax(v :number) {
    this.max = v;
  }

  setMin(v :number) {
    this.min = v;
  }


}

