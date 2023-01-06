import log from 'loglevel';

/**
 * JPS class
 */
class JPS {
  constructor(options) {
    this.message = options?.message || 'hello world';
  }

  async sleep(ms = 3000) {
    return new Promise(resolve => {
      setTimeout(() => {
        log.info('`sleep ${ms} ms ok`');
        resolve('success');
      }, ms);
    });
  }

  static say() {
    // 5-SILENT
    log.info(new Date().toUTCString() + ': ' + this.message);
  }
}

export default JPS;
