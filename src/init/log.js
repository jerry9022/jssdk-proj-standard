/**
 *
 * Created by yangxy on 2023/01/03.
 * 控制台日志初始化
 * 本模块是第三方模块 loglevel 的功能扩展，主要增加内容：
 * (1) 统一增加控制台打印日志前缀
 * (2) 日志单个变量扩展到全变量
 * (3) 增加日志打印控制，可以通过浏览器URL传参数 loglevel=3 控制日志打印。
 * 日志等级可传入0-5的整数，具体可参考：
 *  https://www.npmjs.com/package/loglevel
 *
 * log.trace(msg)
 * log.debug(msg) 等价 log.log(msg)
 * log.info(msg)
 * log.warn(msg) - 默认
 * log.error(msg)
 * 实际日志打印，使用的仍然是使用 loglevel 模块
 */
import log from 'loglevel';

// 设置默认日志级别
log.setDefaultLevel(parseInt(process.env.LOGLEVEL));

// 获取query参数并解析loglevel参数
const query = window.location.search || window.location.hash;
const parser = /([^=?#&]+)=?([^&]*)/g;
let part, ll;
while ((part = parser.exec(query))) {
  if (part[1] === 'loglevel') {
    ll = parseInt(part[2]);
    break;
  }
}
if (ll >= 0 && ll <= 5) {
  log.setLevel(ll);
} else {
  log.resetLevel();
}

// 统一增加前缀; 支持打印多参数
const originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
  var rawMethod = originalFactory(methodName, logLevel, loggerName);

  return function () {
    var messages = [process.env.LOGLEVEL_PREFIX];
    for (var i = 0; i < arguments.length; i++) {
      messages.push(arguments[i]);
    }
    rawMethod.apply(undefined, messages);
  };
};

// Be sure to call setLevel method in order to apply plugin
log.setLevel(log.getLevel());

window.__loglevel = log;
