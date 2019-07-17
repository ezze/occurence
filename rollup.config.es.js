import babel from 'rollup-plugin-babel';

const config = {
  name: 'dissemination',
  input: 'src/index.js',
  output: {
    file: 'dist/dissemination.es.js',
    format: 'es'
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        ['env', { modules: false }]
      ],
      plugins: [
        'external-helpers'
      ],
      exclude: 'node_modules/**'
    })
  ]
};

export default config;
