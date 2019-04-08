/*
Title:
    Game of Life
Year:
    2019
License:
    MIT
Contributors:
    Juho Aallonloiske oli täällä
    Hassan Maskati
    Petteri Peltokangas
    Ville Pietarinen
Repository:
    https://www.github.com/vppiet/game-of-life/
*/

// Entry point
import { Simulation } from "./Simulation";

// ES6 Module export:
export const GameOfLife = Simulation;

// OR

// // Attach to window object:
// declare global {
//     interface Window { [key: string]: any; }
// }
// window.GameOfLife = Simulation