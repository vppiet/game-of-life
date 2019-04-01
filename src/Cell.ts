import { CellInterface } from "./interfaces/CellInterface";
import { Point } from "./Point";

export class Cell implements CellInterface {
    location: Point;
    state: boolean;
    siteElement: HTMLElement;

    constructor(x: number, y: number, state: boolean, element: HTMLElement) {
        this.location = new Point(x, y);
        this.state = state;
        this.siteElement = element;
    }

    die() {
        this.state = false;
    }

    emerge() {
        this.state = true;
    }

    isAlive() {
        return this.state;
    }
}
