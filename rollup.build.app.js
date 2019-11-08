import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: './example/todo-app.js',
    output: {
        dir: __dirname + '/app',
        format: 'esm',
    },
    plugins: [
      resolve(),
      //terser(),
    ]
  }
]