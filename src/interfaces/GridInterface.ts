import { GridRow } from "../GridRow";

export interface GridInterface {
    readonly height: number;
    element: HTMLElement;
    rows: Array<GridRow>;
    readonly width: number;

    initialize(): this;
    populate(): this;
}
