import { Grid } from '../Grid'

export interface SimulationInterface {
    readonly animationSpeed: number;
    readonly tick: number;
    readonly grid: Grid;
    running: boolean;
    toBeStopped: boolean;

    initializeGrid(): this;
    populateGrid(): this;
    start(): number;
    stop(): number;
}
