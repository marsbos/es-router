import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './src/es-route.js',
    output: {
        file: __dirname + '/dist/es-route.min.js',
        format: 'esm',
    },
    plugins: [
     terser(),
    ]
  }
]