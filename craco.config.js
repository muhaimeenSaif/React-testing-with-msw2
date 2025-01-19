// const { presets, plugins } = require('./babel.config.js');
const jestConfig = require('./jest.config.js');

module.exports = {
  jest: {
    babel: {
      addPresets: true,
      addPlugins: true,
    },
    configure: (baseJestConfig) => ({
      ...baseJestConfig,
      ...jestConfig,
    }),
  },
};
