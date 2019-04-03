import { CellInterface } from "./interfaces/CellInterface";
import { GridRow } from "./GridRow";

export class Cell implements CellInterface {
    public element: HTMLElement;
    public readonly coordinateX: number;
    public readonly coordinateY: number;
    public neighbors: Array<Cell>;
    public readonly parentGridRow: GridRow;
    public tickStates: Array<boolean>;

    constructor(coordinateX: number, coordinateY: number, parentGridRow: GridRow) {
        this.element = undefined;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
        this.neighbors = new Array<Cell>();
        this.parentGridRow = parentGridRow;
        this.tickStates = [false, undefined];
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

    // Sets the initial state (tickState[0]) at tick zero.
    // This will be called before running the simulation.
    public setInitialState(state: boolean) {
        this.tickStates[0] = state;

        // Cell is by default dead (black in color) so we check for
        // live initial state.
        if (this.tickStates[0]) {
            this._turnWhite();
        }
        return this;
    }

    private _turnWhite() {
        this.element.setAttribute('style', 'background-color: rgba(256, 256, 256, 1.0);');
        return this;
    }

    private _turnBlack() {
        this.element.setAttribute('style', 'background-color: rgba(0, 0, 0, 1.0);');
        return this;
    }

    public die() {
        this._turnBlack();
        return this;
    }

    public emerge() {
        this._turnWhite();
        return this;
    }

    public getAliveNeighborCount(stateIndex: number) {
        let count = 0;

        for (let neighbor of this.neighbors) {
            if (neighbor.isAlive(stateIndex)) {
                count++;
            }
        }

        return count;
    }

    public isAlive(index: number) {
        return this.tickStates[index];
    }
}
