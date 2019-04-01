import { CellRow } from "../CellRow";

export interface GridInterface {
    rows: Array<CellRow>;
    height: number;
    populate(): this;
    width: number;
}
