import {
    Observable,
    Observer, Subject
} from "rxjs";

export interface AbstractParameterJson {
    [key: string]: any;
}

export class AbstractParameter < T > {

    label: string;
    value: T;

    observable: Subject < T > ;
    observer: Observer < T > ;

    constructor(label: string) {

        this.label = label;
        this.observable =  new Subject();

    }

    randomize() {
        throw "Randomize not implemented"; 
    }

    reset() {
        throw "reset not implemented"; 
    }


    toJson(): AbstractParameterJson {
        const obj: AbstractParameterJson = {};
        obj[this.label] = this.value;
        return obj;
    }

    fromJson(json: AbstractParameterJson) {

    }

    updateValue(value: T) {
        this.value = value;
        this.observable.next(value);
    }

    getValue() : T {
        return this.value; 
    }

    getObservable(): Observable < T > {
        return this.observable;
    }

}