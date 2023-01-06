/**
 * webpack4 公用配置
 * 参考: https://v4.webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
 * dotenv-webpack配置参考：https://www.npmjs.com/package/dotenv-webpack
 * 具体的各环境中使用的配置会合并此配置项
 */
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('../package.json');
const VERSION = pkg.version;
const resolve = dir => path.join(__dirname, '..', dir);

// 检查运行的node环境，版本不支持就停止
require('../scripts/checknode')(pkg);

module.exports = {
  entry: {
    jps: resolve('src/index.js')
  },
  output: {
    path: resolve(`/dist/${VERSION}`),
    filename: `[name]-${VERSION}.js`,
    library: 'JPS',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/'
  },
  // 性能预警配置
  performance: {
    // 关闭预警，可选 false、'warning'、'error'
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        include: [resolve('/src')],
        exclude: ['/node_modules']
      }
    ]
  },
  plugins: [
    // 读取不同环境的配置
    new Dotenv({
      path: resolve(`/.env.${process.env.NODE_ENV}`)
    }),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(VERSION)
    }),
    new HtmlWebpackPlugin({
      title: '测试页面',
      filename: resolve(`dist/${VERSION}/index.html`)
    })
  ]
};
