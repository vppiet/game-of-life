import { SimulationInterface } from './interfaces/SimulationInterface';
import { Grid } from './Grid';

export class Simulation implements SimulationInterface {
    public readonly tickRate: number;
    public tick: number;
    public readonly grid: Grid;
    public running: boolean;
    public toBeStopped: boolean;

    constructor(height: number, width: number, elementID: string) {
        this.tick = 0;
        this.tickRate = 500; // default tick rate in milliseconds
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

    // Starts the simulation.
    // TO-DO: Stopping the main loop after current tick process.
    public start() {
        this.running = true;

        window.setInterval(() => {
            console.log(`Tick: ${this.tick}`);
            this.grid.runTick(this.tick);
            this.tick++;
            document.getElementById("showTick").innerHTML = (`${this.tick}`);
        }, this.tickRate);

        this.toBeStopped = false;
        return this.tick; // return latest tick
    }

    // Tell simulation to be stopped after tick processing has completed.
    // TO-DO: Implement stoppage function to main loop. Consider using events.
    public stop() {
        this.toBeStopped = true;
        return this.tick;
    }
}

// Sleeps asynchronuously.
// Utility function for future usage between ticks.
function sleep(ms: number) {
    return new Promise(resolve => window.setTimeout(resolve, ms));
}
