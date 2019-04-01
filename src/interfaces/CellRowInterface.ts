import { Cell } from '../Cell';

export interface CellRowInterface {
    row: Array<Cell>;
    rowID: number;
    width: number;
    populate(): void;
}
