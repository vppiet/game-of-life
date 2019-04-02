import { GridInterface } from './interfaces/GridInterface';
import { GridRow } from './GridRow';
import { Simulation } from './Simulation';

export class Grid implements GridInterface {
    public element: HTMLElement;
    public readonly height: number;
    public rows: Array<GridRow>;
    public readonly width: number;
    public readonly parentSimulation: Simulation;

    constructor(height: number, width: number, parentSimulation: Simulation, elementID: string) {
        this.element = document.querySelector(elementID);
        this.height = height;
        this.rows = new Array<GridRow>();
        this.width = width;
        this.parentSimulation = parentSimulation;
    }

    public initialize() {
        // Style element to a grid based on given width & height.
        // Set DOM height to same as DOM width for now.
        const cssGridText = `
            display: grid;
            grid-template-columns: repeat(${this.width}, 1fr);
            grid-template-rows: repeat(${this.height}, 1fr);
            height: ${this.element.clientWidth}px
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
}
