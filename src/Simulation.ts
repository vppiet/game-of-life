import { SimulationInterface } from './interfaces/SimulationInterface';
import { Grid } from './Grid';

export class Simulation implements SimulationInterface {
    public readonly animationSpeed: number;
    public readonly tick: number;
    public readonly grid: Grid;
    public running: boolean;
    public toBeStopped: boolean;

    constructor(height: number, width: number, elementID: string) {
        this.animationSpeed = 200;
        this.tick = 0;
        this.grid = new Grid(height, width, this, elementID);
        this.running = false;
        this.toBeStopped = false;
    }

    public initializeGrid() {
        this.grid.initialize();
        return this;
    }

    public populateGrid() {
        this.grid.populate();
        return this;
    }

    public start() {
        return this.tick;
    }

    public stop() {
        return this.tick;
    }
}
