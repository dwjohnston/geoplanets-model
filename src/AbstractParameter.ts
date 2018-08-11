
export interface AbstractParameterJson {
    [key: string] : any; 
}

export class AbstractParameter {

    label: string; 
    value: any; 

    constructor(label: string) {

        this.label = label; 

    }

    randomize() {
        throw "Error, randomize() not initialized"; 
    }

    toJson() : AbstractParameterJson {
        const obj : AbstractParameterJson = {}; 
        obj[this.label] = this.value; 
        return obj; 
    }

    fromJson(json : AbstractParameterJson) {

    }
}