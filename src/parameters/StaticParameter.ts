import {
    AbstractParameter
} from "./AbstractParameter"; 

export class StaticParameter<T> extends AbstractParameter<T> {

    value: T;

    constructor (label: string, value: T) {
        super(label); 
        this.value = value; 
    }

    getValue() :T {
        return this.value; 
    }

    randomize() {
        //Do nothing
    }
}