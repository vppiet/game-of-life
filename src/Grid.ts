import { GridInterface } from './interfaces/GridInterface';
import { GridRow } from './GridRow';
import { Simulation } from './Simulation';

export class Grid implements GridInterface {
    public element: HTMLElement;
    public readonly height: number;
    public rows: Array<GridRow>;
    public readonly width: number;
    public readonly parentSimulation: Simulation;

    constructor(height: number, width: number, parentSimulation: Simulation, elementID: string) {
        this.element = document.querySelector(elementID);
        this.height = height;
        this.rows = [];
        this.width = width;
        this.parentSimulation = parentSimulation;
    }

    public initialize() {
        // Style element to a grid based on width & height
        const cssGridText = `
            display: grid;
            grid-template-columns: repeat(${this.width}, 1fr);
            grid-template-rows: repeat(${this.height}, 1fr);
        `;
        this.element.setAttribute('style', cssGridText);
        this._initializeRows();
        return this;
    }

   private _initializeRows() {
       for (let y = 0; y < this.height; y++) {
           let newRow = new GridRow(this.width, y, this);
           newRow.initialize();
           this.rows.push(newRow);
       }

       return this;
   }

    public populate() {
        // Populate rows
        for (let row of this.rows) {
            row.populate();
        }

        return this;
    }
}
