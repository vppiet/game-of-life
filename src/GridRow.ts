import { GridRowInterface } from "./interfaces/GridRowInterface";
import { Cell } from './Cell';

export class GridRow implements GridRowInterface {
    row: Array<Cell>;
    rowID: number;
    width: number;

    constructor(width: number, rowID: number) {
        this.row = [];
        this.rowID = rowID;
        this.width = width;
    }

    populate() {

    }
}
