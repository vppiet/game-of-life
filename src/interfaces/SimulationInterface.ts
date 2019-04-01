import { Grid } from '../Grid'

export interface SimulationInterface {
    animationSpeed: number;
    cycleNr: number;
    element: HTMLElement;
    grid: Grid;
    running: boolean;
    toBeStopped: boolean;

    populateGridWithRandomStates(): void;
    start(): void;
    stop(): void;
}
