import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const input = 'src/index.js';
const external = ['react'];

export default [
  {
    input,
    external,
    output: [
      // CommonJS
      {
        file: pkg.main,
        format: 'cjs',
      },
      // ES module
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      nodeResolve(),
      babel({
        exclude: ['node_modules/**'],
      }),
      // noreintegrate replace?
    ],
  },
  // UMD
  {
    input,
    external,
    plugins: [
      nodeResolve(),
      commonjs(),
      // noreintegrate replace
      // noreintegrate uglify
    ],
  },
];
