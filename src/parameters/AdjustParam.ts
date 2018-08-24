
import {
    AbstractParameter
} from "./AbstractParameter";

export class AdjustParameter<T> extends AbstractParameter<T> {
    param: AbstractParameter<T>; 
    adjustFn: (value: T) => T; 
    constructor(label: string,
        param: AbstractParameter<T>, 
        adjustFn: (value: T) => T

    ) {
        super(label);
        this.param = param;
        this.adjustFn = adjustFn; 
    }

    getValue(): T {
        return this.adjustFn(this.param.getValue()); 
    }

    randomize() {
        this.param.randomize(); 
    }


    


}