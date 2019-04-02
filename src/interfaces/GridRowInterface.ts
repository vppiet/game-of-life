import { CellInterface } from './CellInterface';

export interface GridRowInterface {
    cells: Array<CellInterface>;
    readonly id: number;
    width: number;

    initialize(): this;
    populate(): this;
}
