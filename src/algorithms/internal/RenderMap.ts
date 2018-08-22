import { ColorParameter } from '../../parameters/ColorParameter';
import { AbstractParameter } from '../../parameters/AbstractParameter';

export interface RenderHint {
    type: string; 
    icon?: string; 
    color? : ColorParameter; 
    params: AbstractParameter<any>[]; 
}

export interface RenderMap {
    [label: string] : RenderHint; 
}