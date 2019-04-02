import { GridRowInterface } from "./GridRowInterface";

export interface GridInterface {
    readonly height: number;
    element: HTMLElement;
    rows: Array<GridRowInterface>;
    readonly width: number;

    initialize(): this;
    populate(): this;
}
