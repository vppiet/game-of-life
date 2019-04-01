import { PointInterface } from "./interfaces/PointInterface";

export class Point implements PointInterface {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
