import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const isProd = (process.env.BUILD === 'production');

const banner =
  `/*
Mokuroku Internal Plugin
Generated bundle - Do not edit directly
*/
`;

export default {
  input: 'main.ts',
  output: {
    dir: '.',
    sourcemap: 'inline',
    sourcemapExcludeSources: isProd,
    format: 'cjs',
    exports: 'default',
    banner,
  },
  external: ['obsidian'],
  plugins: [
    typescript({ tsconfig: './tsconfig.json' }),
    nodeResolve({ browser: true }),
    commonjs(),
    json(),
  ]
};