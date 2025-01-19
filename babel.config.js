const presets = [
  ['@babel/preset-env', { targets: { node: 'current' } }],
  ['@babel/preset-react', {
    runtime: 'automatic',
  }],
];

const plugins = [
  '@babel/plugin-transform-numeric-separator',
  '@babel/plugin-transform-class-properties',
  '@babel/plugin-transform-nullish-coalescing-operator',
  '@babel/plugin-transform-optional-chaining',
  '@babel/plugin-transform-private-methods',
  '@babel/plugin-transform-private-property-in-object',
];

module.exports = { presets, plugins };
