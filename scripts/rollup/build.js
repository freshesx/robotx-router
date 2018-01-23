import babel from 'rollup-plugin-babel'
import eslint from 'rollup-plugin-eslint'

function buildRollup () {
  return {
    input: `src/index.js`,
    output: [
      {
        file: `dist/main.common.js`,
        format: 'cjs'
      },
      {
        file: `dist/main.esm.js`,
        format: 'es'
      }
    ],
    plugins: [
      eslint(),
      babel({
        exclude: 'node_modules/**',
        plugins: [
          'external-helpers'
        ]
      })
    ]
  }
}

export default buildRollup()
