import { GridInterface } from './interfaces/GridInterface';
import { GridRow } from './GridRow';

export class Grid implements GridInterface {
    rows: Array<GridRow>;
    height: number;
    width: number;

    constructor(height: number, width: number) {
        this.rows = [];
        this.height = height;
        this.width = width;
    }

    populate() {
        for (let y = 0; y < this.height; y++) {
            this.rows.push(new GridRow(this.width, y));
        }

        return this;
    }
}
