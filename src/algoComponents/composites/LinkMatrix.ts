import { Position,DrawableObject,  GradientLine, ColorPoint } from 'blacksheep-geometry';

export class LinkMatrix {

    constructor() {

    }


    getLinks(...position: ColorPoint[]) : DrawableObject[] {

        let objs : DrawableObject[] = []; 
        for (let i = 0; i< position.length; i++) {
            for (let j = 1; j< position.length; j++) {
                if (i !== j) {
                    objs.push(new GradientLine(position[i], position[j])); 
                }
            }
        }
        return objs; 
    }
}