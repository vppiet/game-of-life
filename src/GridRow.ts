import { GridRowInterface } from "./interfaces/GridRowInterface";
import { Cell } from './Cell';
import { Grid } from "./Grid";

export class GridRow implements GridRowInterface {
    public cells: Array<Cell>;
    public readonly id: number;
    public readonly parentGrid: Grid;
    public width: number;

    constructor(width: number, id: number, parentGrid: Grid) {
        this.cells = new Array<Cell>();
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
            } else {
                cell.setInitialState(true);
            }
        }

        return this;
    }
}
