import { Cell } from "./Cell";
import { GridRow } from "./GridRow";

export class User {
    public cellColor: string;

    constructor() {
        // this.cellColor = "white";
    }

    // Method allows user to change the lengths of the grid
    public getGridSize(): number {
        const input = document.getElementById("userInput") as HTMLInputElement;
        return parseInt(input.value);
    }

    // Method allows user to change the color of the cells using _turnWhite() from Cell
    public getCellColor():string {
        let checkedValue = this.getRadioValue("cellColor");
        this.cellColor = checkedValue;
        return this.cellColor;
    }

    // Get the value of checked radio button
    private getRadioValue(name: string) {
        let radio = <any> document.getElementsByName(name), i;
        let radioDefault: string = "white";
        for (i = 0; i < radio.length; i++) {
            if (radio[i].checked) { return radio[i].value; }
        }
        return radioDefault;
    }

    // Method allows user to set the initial cell population using populate() from GridRow
    public getInitialPop() {

    }

}