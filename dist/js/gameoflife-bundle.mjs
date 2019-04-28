class User {
    constructor() {
        // this.cellColor = "white";
    }
    // Method allows user to change the lengths of the grid
    getGridSize() {
    }
    // Method allows user to change the color of the cells using _turnWhite() from Cell
    getCellColor() {
        let checkedValue = this.getRadioValue("cellColor");
        this.cellColor = checkedValue;
        return this.cellColor;
    }
    // Get the value of checked radio button
    getRadioValue(name) {
        let radio = document.getElementsByName(name), i;
        let radioDefault = "white";
        for (i = 0; i < radio.length; i++) {
            if (radio[i].checked) {
                return radio[i].value;
            }
        }
        return radioDefault;
    }
    // Method allows user to set the initial cell population using populate() from GridRow
    getInitialPop() {
    }
}
//# sourceMappingURL=User.js.map

class Cell {
    constructor(coordinateX, coordinateY, parentGridRow) {
        this.element = undefined;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.neighbors = new Array();
        this.parentGridRow = parentGridRow;
        this.tickStates = [undefined, undefined];
        this.user = new User();
    }
    initialize() {
        // Create DOM element
        this.element = document.createElement('div');
        // Set ID
        this.element.setAttribute('id', `cell-${this.coordinateY}-${this.coordinateX}`);
        // Set default first state to dead
        this.tickStates[0] = false;
        this.parentGridRow.parentGrid.cellStats.dead++;
        // Set default background-color to black
        this.element.setAttribute('style', 'background-color: rgba(0, 0, 0, 1.0);');
        this.parentGridRow.parentGrid.element.insertAdjacentElement('beforeend', this.element);
        return this;
    }
    ;
    // Sets the initial state (tickState[0]) at tick zero.
    // This will be called before running the simulation.
    setInitialState(state) {
        this.tickStates[0] = state;
        // Cell is by default dead (black in color) so we check for
        // live initial state.
        if (this.tickStates[0]) {
            this._turnWhite();
            this.parentGridRow.parentGrid.cellStats.dead--;
            this.parentGridRow.parentGrid.cellStats.alive++;
        }
        return this;
    }
    _turnWhite() {
        // this.element.setAttribute('style', 'background-color: rgba(256, 256, 256, 1.0);');
        this.element.style.backgroundColor = this.user.getCellColor();
        return this;
    }
    _turnBlack() {
        this.element.setAttribute('style', 'background-color: rgba(0, 0, 0, 1.0);');
        return this;
    }
    die() {
        this._turnBlack();
        return this;
    }
    emerge() {
        this._turnWhite();
        return this;
    }
    getAliveNeighborCount(stateIndex) {
        let count = 0;
        for (let neighbor of this.neighbors) {
            if (neighbor.isAlive(stateIndex)) {
                count++;
            }
        }
        return count;
    }
    isAlive(index) {
        return this.tickStates[index];
    }
}
/* let methodCalls = 0;
    methodCalls++;
    console.log("White Cells: " + methodCalls);

    this.element.style.backgroundColor = "red"; */ 
//# sourceMappingURL=Cell.js.map

class GridRow {
    constructor(width, id, parentGrid) {
        this.cells = new Array();
        this.id = id;
        this.parentGrid = parentGrid;
        this.width = width;
    }
    initialize() {
        for (let x = 0; x < this.width; x++) {
            const newCell = new Cell(x, this.id, this);
            newCell.initialize();
            this.cells.push(newCell);
        }
        return this;
    }
    populate() {
        // Populate cells with random states (for now)
        /* for (let cell of this.cells) {
            const randomState = true ? Math.round(Math.random()) === 1 : false;
            cell.setInitialState(randomState);
        } */
        // Alternative method -- Set the probability of initial cell state
        for (let cell of this.cells) {
            const randomState = Math.random();
            if (randomState >= 0.5) {
                cell.setInitialState(false);
            }
            else {
                cell.setInitialState(true);
            }
        }
        return this;
    }
}
//# sourceMappingURL=GridRow.js.map

class Grid {
    constructor(height, width, parentSimulation, elementID) {
        this.element = document.querySelector(elementID);
        this.height = height;
        this.rows = new Array();
        this.width = width;
        this.parentSimulation = parentSimulation;
        this.cellStats = { alive: 0, dead: 0, totalPop: 0 };
    }
    initialize() {
        // Style element to a grid based on given width & height.
        // Set DOM height to same as DOM width for now.
        const cssGridText = `
            display: grid;
            grid-template-columns: repeat(${this.width}, 1fr);
            grid-template-rows: repeat(${this.height}, 1fr);
            height: ${this.element.clientWidth * (this.height / this.width)}px
        `;
        this.element.setAttribute('style', cssGridText);
        this._initializeRows();
        this._setCellNeighbors();
        return this;
    }
    // Set neighbors for cells.
    // We do this on grid level since height is also known. This is useful
    // to know when dealing with edge cases.
    // Neighbor cell listing will be used when counting alive neighbors
    // over ticks.
    _setCellNeighbors() {
        for (let row of this.rows) {
            for (let cell of row.cells) {
                const cellCoordX = cell.coordinateX;
                const cellCoordY = cell.coordinateY;
                // Northern neighbors (if there is a row above)
                if (cellCoordY - 1 >= 0) {
                    const northernRow = this.rows[cellCoordY - 1];
                    // NORTHWESTERN NEIGHBOR (upleft)
                    if (cellCoordX - 1 >= 0) {
                        cell.neighbors.push(northernRow.cells[cellCoordX - 1]);
                    }
                    // NORTHERN NEIGHBOR (up, there is always a neighbor above)
                    cell.neighbors.push(northernRow.cells[cellCoordX]);
                    // NORTHEASTERN NEIGHBOR (upright)
                    if (cellCoordX + 1 <= northernRow.width - 1) {
                        cell.neighbors.push(northernRow.cells[cellCoordX + 1]);
                    }
                }
                // EASTERN NEIGHBOR (right)
                if (cellCoordX + 1 <= this.width - 1) {
                    cell.neighbors.push(row.cells[cellCoordX + 1]);
                }
                // Southern neighbors (if there is a row below)
                if (cellCoordY + 1 <= this.height - 1) {
                    const southernRow = this.rows[cellCoordY + 1];
                    // SOUTHEASTERN NEIGHBOR (downright)
                    if (cellCoordX + 1 <= southernRow.width - 1) {
                        cell.neighbors.push(southernRow.cells[cellCoordX + 1]);
                    }
                    // SOUTHERN NEIGHBOR (down, there is always a neighbor below)
                    cell.neighbors.push(southernRow.cells[cellCoordX]);
                    // SOUTHWESTERN NEIGHBOR (downleft)
                    if (cellCoordX - 1 >= 0) {
                        cell.neighbors.push(southernRow.cells[cellCoordX - 1]);
                    }
                }
                // WESTERN NEIGHBOR (left)
                if (cellCoordX - 1 >= 0) {
                    cell.neighbors.push(row.cells[cellCoordX - 1]);
                }
            }
        }
    }
    _initializeRows() {
        for (let y = 0; y < this.height; y++) {
            let newRow = new GridRow(this.width, y, this);
            newRow.initialize();
            this.rows.push(newRow);
        }
        return this;
    }
    // Populate rows.
    populate() {
        for (let row of this.rows) {
            row.populate();
        }
        return this;
    }
    // Run tick.
    runTick(tick) {
        const currentStateIndex = tick % 2;
        const nextStateIndex = Math.abs(currentStateIndex - 1);
        for (let row of this.rows) {
            for (let cell of row.cells) {
                const liveNeighborCount = cell.getAliveNeighborCount(currentStateIndex);
                // If cell is alive and has less than two live neighbors
                if (cell.tickStates[currentStateIndex] === true && (liveNeighborCount < 2 || liveNeighborCount > 3)) {
                    cell.die();
                    cell.tickStates[nextStateIndex] = false;
                    this.cellStats.alive--;
                    this.cellStats.dead++;
                    continue;
                }
                // If cell is dead and has exactly three live neighbors
                if (cell.tickStates[currentStateIndex] === false && liveNeighborCount === 3) {
                    cell.emerge();
                    cell.tickStates[nextStateIndex] = true;
                    this.cellStats.dead--;
                    this.cellStats.alive++;
                    continue;
                }
                // If no changes are made, pass current state to next tick
                cell.tickStates[nextStateIndex] = cell.tickStates[currentStateIndex];
            }
        }
    }
    showPopulation() {
        this.cellStats.totalPop = this.cellStats.alive + this.cellStats.dead;
        document.getElementById("showPop").innerHTML = this.cellStats.totalPop.toString();
        document.getElementById("showDead").innerHTML = this.cellStats.dead.toString();
        document.getElementById("showAlive").innerHTML = this.cellStats.alive.toString();
    }
}
//# sourceMappingURL=Grid.js.map

class Simulation {
    constructor(height, width, elementID) {
        this.tick = 0;
        this.tickRate = 100; // default tick rate in milliseconds
        this.grid = new Grid(height, width, this, elementID);
        this.running = false;
        this.toBeStopped = false;
    }
    addButtons() {
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
    initializeGrid() {
        this.grid.initialize();
        return this;
    }
    populateGrid() {
        this.grid.populate();
        return this;
    }
    showTick() {
        document.getElementById("showTick").innerHTML = this.tick.toString();
        return this;
    }
    // Starts the simulation.
    // TO-DO: Stopping the main loop after current tick process.
    start() {
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
            }
            else {
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
    stop() {
        this.toBeStopped = true;
        return this.tick;
    }
}

/*
Title:
    Game of Life
Year:
    2019
License:
    MIT
Contributors:
    Juho Aallonloiske
    Hassan Maskati
    Petteri Peltokangas
    Ville Pietarinen
Repository:
    https://www.github.com/vppiet/game-of-life/
*/
// ES6 Module export:
const GameOfLife = Simulation;
// OR
// // Attach to window object:
// declare global {
//     interface Window { [key: string]: any; }
// }
// window.GameOfLife = Simulation;
//# sourceMappingURL=Index.js.map

export { GameOfLife };
