import { CellRowInterface } from "./CellRowInterface";
import { Cell } from './Cell';

export class CellRow implements CellRowInterface {
    row: Array<Cell>;
    rowID: number;
    width: number;

    constructor(width: number, rowID: number) {
        this.row = [];
        this.rowID = rowID;
        this.width = width;
    }

    populate() {
        for (let x = 0; x < this.width; x++) {
            const newCell = new Cell(x, this.rowID, getRandomState(), document.createElement('div'));
            this.row.push(newCell);
        }
    }
}

function getRandomState() {
    return Math.round(Math.random()) === 1;
}
