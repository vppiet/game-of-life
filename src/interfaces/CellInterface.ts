import { Point } from '../Point';

export interface CellInterface {
    siteElement: HTMLElement;
    location: Point;
    state: boolean;
    die(): void;
    emerge(): void;
    isAlive(): boolean;
}
