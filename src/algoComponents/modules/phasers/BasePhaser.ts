
/**
 * Return a phase between 0-2PI 
 */
export function basePhase(time: number, speed: number, initPhase: number) :number {
  let phase =   initPhase + (speed * time * 2* Math.PI);
  return (phase + 2*Math.PI)   % (2*Math.PI);
}

