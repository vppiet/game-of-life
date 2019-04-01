import { GridRow } from "../GridRow";

export interface GridInterface {
    rows: Array<GridRow>;
    height: number;
    populate(): this;
    width: number;
}
