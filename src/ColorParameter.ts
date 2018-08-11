import {AbstractParameter} from "./AbstractParameter"; 
import {Color} from "blacksheep-geometry"; 
import { AbstractParameterJson } from "./AbstractParameter";

export class ColorParameter extends AbstractParameter{

    value: Color; 
    
    constructor(label : string, color : Color) {
        super(label); 
        this.value = color; 
    }

    randomize() {
        this.value.randomize(); 
    }

    toJson() : AbstractParameterJson {
        const obj : AbstractParameterJson = {}; 
        obj[super.label] = this.value.toJson(); 
        return obj; 
    }
}