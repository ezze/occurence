import babel from 'rollup-plugin-babel';

const config = {
  input: 'src/index.js',
  output: {
    name: 'dissemination',
    file: 'dist/dissemination.es.js',
    format: 'es'
  },
  plugins: [
    babel({
      babelrc: true,
      externalHelpers: true,
      plugins: [],
      exclude: 'node_modules/**'
    })
  ]
};

export default config;
