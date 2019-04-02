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
                const x = cell.coordinateX;
                const y = cell.coordinateY;

                // Northern neighbors (cell's row minus one)
                if (!(y - 1 < 0)) {
                    const northernRow = this.rows[y-1];

                    // NORTHWESTERN NEIGHBOR


                    // NORTHERN NEIGHBOR
                    const northernNeighbor = northernRow.cells[x];
                    cell.neighbors.push(northernNeighbor);
                    
                    // NORTHEASTERN NEIGHBOR

                }

                // EASTERN NEIGHBOR

                // Southern neighbors
                    // SOUTHEASTERN NEIGHBOR
                    // SOUTHERN NEIGHBOR
                    // SOUTHWESTERN NEIGHBOR

                // WESTERN NEIGHBOR
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
