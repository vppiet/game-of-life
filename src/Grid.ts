import { GridInterface } from './interfaces/GridInterface';
import { GridRow } from './GridRow';
import { Simulation } from './Simulation';
import { Cell } from './Cell';

export class Grid implements GridInterface {
    public element: HTMLElement;
    public readonly height: number;
    public rows: Array<GridRow>;
    public readonly width: number;
    public readonly parentSimulation: Simulation;
    public cellStats: {alive: number, dead: number};
    public readonly cell: Cell;

    constructor(height: number, width: number, parentSimulation: Simulation, elementID: string) {
        this.element = document.querySelector(elementID);
        this.height = height;
        this.rows = new Array<GridRow>();
        this.width = width;
        this.parentSimulation = parentSimulation;
        this.cellStats = {alive: 0, dead: 0};
    }

    public initialize() {
        // Style element to a grid based on given width & height.
        // Set DOM height to same as DOM width for now.
        const cssGridText = `
            display: grid;
            grid-template-columns: repeat(${this.width}, 1fr);
            grid-template-rows: repeat(${this.height}, 1fr);
            height: ${this.element.clientWidth * (this.height/this.width)}px
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
    private _setCellNeighbors() {
        for (let row of this.rows) {
            for (let cell of row.cells) {
                const cellCoordX = cell.coordinateX;
                const cellCoordY = cell.coordinateY;

                // Northern neighbors (if there is a row above)
                if (cellCoordY - 1 >= 0) {
                    const northernRow = this.rows[cellCoordY-1];

                    // NORTHWESTERN NEIGHBOR (upleft)
                    if (cellCoordX - 1 >= 0) {
                        cell.neighbors.push(northernRow.cells[cellCoordX-1])
                    }
                    
                    // NORTHERN NEIGHBOR (up, there is always a neighbor above)
                    cell.neighbors.push(northernRow.cells[cellCoordX]);

                    // NORTHEASTERN NEIGHBOR (upright)
                    if (cellCoordX + 1 <= northernRow.width - 1) {
                        cell.neighbors.push(northernRow.cells[cellCoordX+1])
                    }
                }

                // EASTERN NEIGHBOR (right)
                if (cellCoordX + 1 <= this.width - 1) {
                    cell.neighbors.push(row.cells[cellCoordX+1]);
                }

                // Southern neighbors (if there is a row below)
                if (cellCoordY + 1 <= this.height - 1) {
                    const southernRow = this.rows[cellCoordY+1];

                    // SOUTHEASTERN NEIGHBOR (downright)
                    if (cellCoordX + 1 <= southernRow.width - 1) {
                        cell.neighbors.push(southernRow.cells[cellCoordX+1])
                    }

                    // SOUTHERN NEIGHBOR (down, there is always a neighbor below)
                    cell.neighbors.push(southernRow.cells[cellCoordX]);

                    // SOUTHWESTERN NEIGHBOR (downleft)
                    if (cellCoordX - 1 >= 0) {
                        cell.neighbors.push(southernRow.cells[cellCoordX-1]);
                    }
                }

                // WESTERN NEIGHBOR (left)
                if (cellCoordX - 1 >= 0) {
                    cell.neighbors.push(row.cells[cellCoordX-1]);
                }
            }
        }
    }

   private _initializeRows() {
       for (let y = 0; y < this.height; y++) {
           let newRow = new GridRow(this.width, y, this);
           newRow.initialize();
           this.rows.push(newRow);
       }

       return this;
   }

   // Populate rows.
    public populate() {
        for (let row of this.rows) {
            row.populate();
        }

        return this;
    }

    // Run tick.
    public runTick(tick: number) {
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

    // Algorithm for checking number of dead or alive cells:
    /*  
    1. declare cellStats object
    2. create the function and variables
    3. check the cells' matrix/grid
    4. count the total number of alive or dead elements for every tick state
    --> for each row and column, check to see if cell state is true/false
    5. store and return this value in the variable
    6. display it in html
    */

    public cellCount() {
        this.cellStats.alive = 0;
        let cellAlive = 0;
        let count = 0;
        for (let x = 0; x < this.height; x++) {
            for (let y = 0; y < this.width; y++) {
                if (this.cell.tickStates[0]) {
                    count++;
                }
            }
        }
        //this.cellStats.alive = count;
        console.log("COUNT ----->> " + count);
    }

}
