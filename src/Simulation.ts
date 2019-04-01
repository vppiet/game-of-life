import { SimulationInterface } from './interfaces/SimulationInterface';
import { Grid } from './Grid';

export class Simulation implements SimulationInterface {
    animationSpeed: number;
    cycleNr: number;
    element: HTMLElement;
    grid: Grid;
    running: boolean;
    toBeStopped: boolean;

    constructor(height: number, width: number, elementID: string) {
        this.animationSpeed = 200;
        this.cycleNr = 0;
        this.element = document.getElementById(elementID);
        this.grid = new Grid(height, width);
        this.running = false;
        this.toBeStopped = false;
    }

    populateGridWithRandomStates() {
        
    }

    start() {

    }

    stop() {

    }
}
