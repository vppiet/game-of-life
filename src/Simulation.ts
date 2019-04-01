import { SimulationInterface } from './SimulationInterface';
import { Grid } from './Grid';

export class Simulation implements SimulationInterface {
    animationSpeed: number;
    cycleNr: number;
    grid: Grid;
    running: boolean;
    siteElement: HTMLElement;
    height: number;
    width: number;

    constructor(height: number, width: number, siteElementID: string) {
        this.cycleNr = 0;
        this.height = height;
        this.width = width;
        this.grid = new Grid(this.height, this.width);
        this.siteElement = document.getElementById(siteElementID);
    }

    populateGrid() {
        for (let row of this.grid.rows) {
            row.populate();
        }
    }

    start() {

    }

    stop() {

    }
}
