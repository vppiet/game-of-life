export interface CellInterface {
    element: HTMLElement;
    readonly coordinateX: number;
    readonly coordinateY: number;
    tickStates: Array<boolean>;

    die(): void;
    emerge(): void;
    getAliveNeighborCount(): number;
    isAlive(): boolean;
}
