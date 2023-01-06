const path = require('path');
const merge = require('webpack-merge');
const baseCfg = require('./base.config');
const resolve = dir => path.join(__dirname, '..', dir);

module.exports = merge(baseCfg, {
  devtool: 'source-map',
  mode: 'development'
});

module.exports = merge(baseCfg, {
  // 模式
  mode: 'development',
  // 开启source-map
  devtool: 'source-map',
  // 压缩配置
  optimization: {
    // 不启用压缩
    minimize: false
  },
  // 开发服务配置
  devServer: {
    // 指定使用一个host。默认是localhost
    host: '0.0.0.0',
    // 允许浏览器使用本地 IP
    useLocalIp: true,
    // 端口
    port: '8090',
    // 索引文件的文件名
    index: 'index.html',
    // 启动后打开浏览器
    open: true,
    // 启用webpack的模块热替换功能
    hot: true,
    // 绕过主机检查。不建议这样做，因为不检查主机的应用程序容易受到 DNS 重新连接攻击。
    disableHostCheck: true,
    // 静态资源目录
    contentBase: resolve('public'),
    // 不启用gzip压缩
    compress: false,
    // 不启用https, 需要启用的话设置成 true 即可
    https: false
    // https证书配置
    // https: {
    //   key: fs.readFileSync(resolve('/webpack/ssl-cert/key.pem')),
    //   cert: fs.readFileSync(resolve('/webpack/ssl-cert/cert.pem'))
    // }
  }
});
