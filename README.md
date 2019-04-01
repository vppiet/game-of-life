# Game of Life
*Implementation of Conway's Game of Life in TypeScript*

## Prerequisites
Install Node modules with `npm install`.

## Compiling and bundling
Webpack is used to bundle all compiled TypeScript files
located in src folder into a singe JavaScript file in
dist/js folder.

| Script          | Details                                  |
|-----------------|------------------------------------------|
| `npm run build` | Compile with tsc and bundle with Webpack |
| `npm run watch` | Same as `build` but watch for changes    |

## Interfaces
- **Cell**
    - *Properties:*
        - siteElement: HTMLDivElement
        - location: Point
        - state: boolean
    - *Methods:*
        - die(): void
        - emerge(): void
        - isAlive(): boolean
- **CellRow**
    - *Properties:*
        - row: Array<Cell>
        - width: number
- **Grid**
    - *Properties:*
        - rows: Array<CellRow>
        - height: number
        - width: number
- **Point**
    - *Properties:*
        - x: number
        - y: number
- **Simulation**
    - *Properties:*:
        - animationSpeed: number
        - currentGrid: Grid
        - futureGrid: Grid
        - running: boolean
        - siteElement: HTMLDivElement
    - *Methods*:
        - start(): void
        - stop(): void
