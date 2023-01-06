const merge = require('webpack-merge');
const baseCfg = require('./base.config');

module.exports = merge(baseCfg, {
  devtool: '',
  mode: 'production'
});
