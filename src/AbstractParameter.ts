import {
    Observable,
    Observer
} from "rxjs";

export interface AbstractParameterJson {
    [key: string]: any;
}

export class AbstractParameter < T > {

    label: string;
    value: any;

    observable: Observable < T > ;
    observer: Observer < T > ;


    tickables: AbstractParameter < any > []; // Parameters which - if algorithm ticks, these params should tick. 
    resetParams: AbstractParameter < any > []; // Parameters which - if algorithm resets, these params should reset
    clearParams: AbstractParameter < any > []; // Parameters which - if they've changed, should clear the whole thing
    randomParams: AbstractParameter < any > []; // Parameters which - if randomize() is called - should be randomized 


    constructor(label: string) {

        this.label = label;

        this.observable = Observable.create((observer: Observer < T > ) => {
            this.observer = observer;
        });

    }

    randomize() {
        this.randomParams.forEach((p: AbstractParameter < any > ) => p.randomize());
    }

    reset() {
        this.resetParams.forEach((p: AbstractParameter < any > ) => p.reset());
    }

    tick() {
        this.tickables.forEach((p: AbstractParameter < any > ) => p.tick());
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
        this.observer.next(value);
    }

    getValue() : T {
        return this.value; 
    }

    getObservable(): Observable < T > {
        return this.observable;
    }

    initialiseClearEventSubscriptions() {
        this.clearParams.forEach((p: AbstractParameter<any>) => {
            p.getObservable().subscribe((v: T) => {
                //We emit the current value to let the eventual parent know that a clear is required.
                //This will onlywork if the parent has this parameter as a clear param. 
                this.observer.next(this.value); 
            }); 
        }); 
    }

}