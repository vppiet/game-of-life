# Game of Life
*Implementation of Conway's Game of Life in TypeScript*

## Prerequisites
Install Node modules with `npm install`.

## Compiling and bundling
Rollup is used to bundle all compiled TypeScript files
located in src folder into a singe JavaScript file in
dist/js folder.

| Script          | Details                                  |
|-----------------|------------------------------------------|
| `npm run build` | Compile with tsc and bundle with Rollup  |
| `npm run watch` | Same as `build` but watch for changes    |
