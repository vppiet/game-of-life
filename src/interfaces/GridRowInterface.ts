import { Cell } from '../Cell';

export interface GridRowInterface {
    cells: Array<Cell>;
    readonly id: number;
    width: number;

    initialize(): this;
    populate(): this;
}
