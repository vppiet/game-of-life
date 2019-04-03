import { Grid } from '../Grid'

export interface SimulationInterface {
    readonly tick: number;
    readonly tickRate: number;
    readonly grid: Grid;
    running: boolean;
    toBeStopped: boolean;

    initializeGrid(): this;
    populateGrid(): this;
    start(): number;
    stop(): number;
}
