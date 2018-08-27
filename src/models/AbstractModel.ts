import { PlanetPackage } from './AbstractPlanetModel';
import { RenderHint } from '../algorithms/internal/RenderMap'; 


export class AbstractModel {

    getRenderHint(): RenderHint{
        throw "getRenderHint() not implemented"
    }
    subTick(time: number): PlanetPackage {

        throw "subtick() not implemented";
    }

}