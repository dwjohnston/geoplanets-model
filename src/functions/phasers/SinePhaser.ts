
export function sinePhase(time: number, speed: number, initPhase: number, amplitude: number) : number{
  return Math.sin(initPhase + time * speed) * amplitude;
}
