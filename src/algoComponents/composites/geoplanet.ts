
import { DrawableObject } from 'blacksheep-geometry';
import { Position } from 'blacksheep-geometry';
export interface GeoplanetPackage {

    previews: DrawableObject[]; 
    positions: Position[]; 
}

export function getGeoPlanetPackage (
    time : number, 
    initPhase : number, 
    speed: number, 
    distance: number, 
    center: Position, 

    initRotationPhase: number, 
    rotationSpeed: number
): GeoplanetPackage {

     
}