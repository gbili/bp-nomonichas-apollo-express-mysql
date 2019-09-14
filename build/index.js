"use strict";

var _loaders = _interopRequireDefault(require("./loaders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  (async function () {
    try {
      await _loaders.default.loadAll();
      const app = await _loaders.default.get('app');
      const logger = await _loaders.default.get('logger');
      const {
        path,
        port
      } = await _loaders.default.get('appConfig');
      app.listen({
        port
      }, () => {
        logger.log(' ///////////////////////////////////////////////////////////');
        logger.log(` ////////////// App: localhost:${port}/${path} /////////////`);
        logger.log(' ///////////////////////////////////////////////////////////');
      });
    } catch (err) {
      throw err;
    }
  })();
} catch (err) {
  throw err;
}