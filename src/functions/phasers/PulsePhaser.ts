import { basePhase } from "./BasePhaser";

/**
 * 
 * 
 * 
 * @param time 
 * @param speed 
 * @param initPhase 
 * @param amplitude 
 */
export function pulsePhaser(time: number, speed: number, initPhase: number) : boolean{

   let phase =   initPhase + (speed * time);
    return Math.floor((phase / speed) / speed) % 2 == 0; 
}
