import { pulsePhaser } from "../phasers/PulsePhaser";

describe("pulse phaser", () => {

    it("(t = 0, speed = PI/2, initPhase =0) returns true", () => {
        expect(pulsePhaser(0, Math.PI / 2, 0)).toBe(true);
    });

    it("(t = 1, speed = PI/2, initPhase =0) returns true", () => {
        expect(pulsePhaser(1, Math.PI / 2, 0)).toBe(true);
    });

    it("(t = 2, speed = PI/2, initPhase =0) returns false", () => {
        expect(pulsePhaser(2, Math.PI / 2, 0)).toBe(false);
    });

    it("(t = 3, speed = PI/2, initPhase =0) returns false", () => {
        expect(pulsePhaser(3, Math.PI / 2, 0)).toBe(false);
    });

}); 
