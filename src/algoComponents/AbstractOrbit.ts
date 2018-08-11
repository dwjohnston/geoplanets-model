import {
    AbstractParameter
} from "../AbstractParameter";
import {
    Position
} from "blacksheep-geometry";
import {
    Parameter
} from "../Parameter";

export class AbstractOrbit extends AbstractParameter < Position[] > {


    speed: Parameter;
    distance: Parameter;

    center: Position;

    currentPhase: number;
    initPhase: number;

    positionsList: Position[];
    previousPositionsList: Position[];
    nPositions: Parameter;

    constructor(
        label: string,
        speed: Parameter,
        distance: Parameter,
        center: Position,
        initPhase: number,
        nPositions: Parameter,
    ) {

        super(label);
        this.speed = speed;
        this.distance = distance;
        this.initPhase = initPhase;
        this.currentPhase = initPhase;
        this.center = center;
        this.nPositions = nPositions;


        this.tickables = [];
        this.resetParams = [];
        this.randomParams = [this.speed, this.distance];
        this.clearParams = [this.speed, this.distance];


        this.initPositions();
        this.initialiseClearEventSubscriptions();
    }


    reset() {
        this.currentPhase = this.initPhase;
    }

    getCenter() {
        return this.center;
    }

    getPositions(): Position[] {
        return this.positionsList;
    }

    getPreviousPositions(): Position[] {
        return this.previousPositionsList;
    }

    calcPositions(): Position[] {
        throw "Calc positions not implmented";
    }

    initPositions() {
        for (let i = 0; i < this.nPositions.getValue(); i++) {
            this.positionsList[i] = this.center.copy();
            this.previousPositionsList[i] = this.center.copy();
        }
    }

}