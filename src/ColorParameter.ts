import {AbstractParameter} from "./AbstractParameter"; 
import {Color} from "../../blacksheep-geometry/lib"; 
import { AbstractParameterJson } from "./AbstractParameter";

export class ColorParameter extends AbstractParameter<Color>{

    value: Color; 
    
    constructor(label : string, color : Color) {
        super(label); 
        this.value = color; 
    }

    randomize() {
        this.value.randomize(); 
        this.updateValue(this.value); 
    }

    toJson() : AbstractParameterJson {
        const obj : AbstractParameterJson = {}; 
        obj[this.label] = this.value.toJson(); 
        return obj; 
    }
}