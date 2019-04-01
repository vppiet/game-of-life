import { Cell } from '../Cell';

export interface GridRowInterface {
    row: Array<Cell>;
    rowID: number;
    width: number;
    populate(): void;
}
