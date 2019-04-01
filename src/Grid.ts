import { GridInterface } from './interfaces/GridInterface';
import { CellRow } from './CellRow';

export class Grid implements GridInterface {
    rows: Array<CellRow>;
    height: number;
    width: number;

    constructor(height: number, width: number) {
        this.rows = [];
        this.height = height;
        this.width = width;
    }

    populate() {
        for (let y = 0; y < this.height; y++) {
            this.rows.push(new CellRow(this.width, y));
        }

        return this;
    }
}
