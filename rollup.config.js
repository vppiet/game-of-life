// rollup.config.js
import typescript from 'rollup-plugin-typescript';

export default {
  input: './src/Index.ts',
  output: [
    {
      file: './dist/js/gameoflife-bundle.mjs',
      format: 'esm'
    }
  ],
  plugins: [
    typescript()
  ]
}
