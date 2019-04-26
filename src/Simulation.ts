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
        this.tickRate = 100; // default tick rate in milliseconds
        this.grid = new Grid(height, width, this, elementID);
        this.running = false;
        this.toBeStopped = false;
    }

    public initializeGrid(): this {
        this.grid.initialize();
        return this;
    }

    public populateGrid(): this {
        this.grid.populate();
        return this;
    }

    public showTick(): void {
        document.getElementById("showTick").innerHTML = this.tick.toString();
    }

    // Starts the simulation.
    // TO-DO: Stopping the main loop after current tick process.
    public start(): number {
        this.running = true;

        window.setInterval(() => {
            this.showTick();
            this.grid.runTick(this.tick);
            this.tick++;
            this.grid.showPopulation();
        }, this.tickRate);

        this.toBeStopped = false;
        return this.tick; // return latest tick
    }

    // Tell simulation to be stopped after tick processing has completed.
    // TO-DO: Implement stoppage function to main loop. Consider using events.
    public stop(): number {
        this.toBeStopped = true;
        return this.tick;
    }
}

// Sleeps asynchronuously.
// Utility function for future usage between ticks.
function sleep(ms: number) {
    return new Promise(resolve => window.setTimeout(resolve, ms));
}
