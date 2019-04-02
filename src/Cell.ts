import { CellInterface } from "./interfaces/CellInterface";
import { GridRow } from "./GridRow";

export class Cell implements CellInterface {
    public element: HTMLElement;
    public readonly coordinateX: number;
    public readonly coordinateY: number;
    public readonly parentGridRow: GridRow;
    public tickStates: Array<boolean>;

    constructor(coordinateX: number, coordinateY: number, parentGridRow: GridRow) {
        this.element = undefined;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.parentGridRow = parentGridRow;
        this.tickStates = [false, false];
    }

    public initialize() {
        // Create DOM element
        this.element = document.createElement('div');
        
        // Set ID
        this.element.setAttribute('id', `cell-${this.coordinateY}-${this.coordinateX}`);

        // Set default background-color to black
        this.element.setAttribute('style', 'background-color: rgba(0, 0, 0, 1.0);');
        this.parentGridRow.parentGrid.element.insertAdjacentElement('beforeend', this.element);
        return this;
    };

    public die() {
        this.element.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.0);');
        return this;
    }

    public emerge() {
        this.element.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.0);');
        return this;
    }

    public getAliveNeighborCount() { return 0; };
    public isAlive() { return this.tickStates[0]; };
}
