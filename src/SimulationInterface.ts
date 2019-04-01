import { Grid } from './Grid'

export interface SimulationInterface {
    animationSpeed: number;
    cycleNr: number;
    grid: Grid;
    height: number;
    populateGrid(): void;
    running: boolean;
    siteElement: HTMLElement;
    start(): void;
    stop(): void;
    width: number;
}
