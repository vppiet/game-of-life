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

    public addButtons(): this {
        let startBtn = document.createElement("button");
        startBtn.innerHTML = "Start";
        startBtn.setAttribute("id", "start");
        startBtn.addEventListener("click", this.start.bind(this));
        document.getElementById("buttons").appendChild(startBtn);
        
        let stopBtn = document.createElement("button");
        stopBtn.innerHTML = "Stop";
        stopBtn.setAttribute("id", "stop");
        stopBtn.setAttribute("disabled", "");
        stopBtn.addEventListener("click", this.stop.bind(this));
        document.getElementById("buttons").appendChild(stopBtn);

        return this;
    }

    public initializeGrid(): this {
        this.grid.initialize();
        return this;
    }

    public populateGrid(): this {
        this.grid.populate();
        return this;
    }

    public showTick(): this {
        document.getElementById("showTick").innerHTML = this.tick.toString();
        return this;
    }

    // Starts the simulation.
    // TO-DO: Stopping the main loop after current tick process.
    public start(): void {
        const startBtn = document.getElementById('start');
        startBtn.setAttribute('disabled', '');

        const stopBtn = document.getElementById('stop');
        stopBtn.removeAttribute('disabled');

        this.running = true;

        const intervalID = window.setInterval(() => {
            if (!this.toBeStopped) {
                this.showTick();
                this.grid.runTick(this.tick);
                this.tick++;
                this.grid.showPopulation();
            } else {
                window.clearInterval(intervalID);
                startBtn.removeAttribute('disabled');
                stopBtn.setAttribute('disabled', '');

                this.toBeStopped = false;
                this.running = false;
            }
        }, this.tickRate);

        return;
    }

    // Tell simulation to be stopped after tick processing has completed.
    // TO-DO: Implement stoppage function to main loop. Consider using events.
    public stop(): number {
        this.toBeStopped = true;
        return this.tick;
    }
}
