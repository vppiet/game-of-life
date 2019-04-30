import { SimulationInterface } from './interfaces/SimulationInterface';
import { Grid } from './Grid';
import { User } from './User';

export class Simulation implements SimulationInterface {
    public readonly tickRate: number;
    public tick: number;
    public readonly grid: Grid;
    public running: boolean;
    public toBeStopped: boolean;
    public user: User;

    constructor(height: number, width: number, elementID: string) {
        this.tick = 0;
        this.tickRate = 100; // default tick rate in milliseconds
        this.grid = new Grid(height, width, this, elementID);
        this.running = false;
        this.toBeStopped = false;
        this.user = new User();
        this.user.cellColor = this.user.getCellColor();
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
    public start(): number {
        const startBtn = document.getElementById('start');
        startBtn.innerHTML = "Resume";
        startBtn.setAttribute('disabled', '');

        const stopBtn = document.getElementById('stop');
        stopBtn.removeAttribute('disabled');

        const userInputField = document.getElementById('userInput');
        userInputField.setAttribute('disabled', '');

        const cellColorRadios = document.querySelectorAll('input[name="cellColor"]');
        cellColorRadios.forEach((element) => {
            element.setAttribute('disabled', '');
        });
        
        const reloadGridBtn = document.getElementById('reloadGrid');
        reloadGridBtn.setAttribute('disabled', '');

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
                userInputField.removeAttribute('disabled');
                cellColorRadios.forEach((element) => {
                    element.removeAttribute('disabled');
                });
                reloadGridBtn.removeAttribute('disabled');

                this.toBeStopped = false;
                this.running = false;
            }
        }, this.tickRate);

        return this.tick;
    }

    // Tell simulation to be stopped after tick processing has completed.
    public stop(): number {
        this.toBeStopped = true;
        return this.tick;
    }

    public reload(height: number, width: number, color: string): void {
        // Reset tick
        this.tick = 0;

        // Clear statistics
        this.grid.cellStats = {
            alive: 0,
            dead: 0,
            totalPop: 0
        };

        // Remove all rows with cells and their HTML elements
        this.grid.removeAllRows();

        // Set new height and width
        this.grid.height = height;
        this.grid.width = width;

        // Re-initialize and populate grid
        this.initializeGrid();
        this.populateGrid();

        // Re-initialize UI
        const startBtn = document.getElementById('start') as HTMLButtonElement;
        startBtn.innerHTML = 'Start';

        this.showTick();
        this.grid.showPopulation();
    }

    public getSettings(): void {
        const warningElem = document.getElementById('gridSizeWarning') as HTMLSpanElement;

        const height = this.user.getGridSize();
        if (height > 100) {
            warningElem.innerText = 'Must be less or equal to 100!';
            return;
        }

        warningElem.innerText = '';

        const width = height;
        const cellColor = this.user.getCellColor();
        this.user.cellColor = cellColor;

        this.reload(height, width, cellColor);
        const headerElem = document.getElementById('header') as HTMLDivElement;
        headerElem.className = cellColor;
    }

    public attachReloadEventHandler(): this {
        const reloadBtn = document.getElementById('reloadGrid') as HTMLButtonElement;
        reloadBtn.addEventListener('click', this.getSettings.bind(this));
        return this;
    }
}
