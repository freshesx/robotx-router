const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  mapCoverage: true,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/scripts/jest/coverage',
  moduleFileExtensions: [
    'js'
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  }
}
