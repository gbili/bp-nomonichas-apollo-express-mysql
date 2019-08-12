"use strict";

var _loaders = _interopRequireDefault(require("./loaders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(async function () {
  try {
    const di = _loaders.default.getLatestContainer();

    await di.loadAll();
    const App = await di.get('App');
    const logger = await di.get('logger');
    const appConfig = await di.get('appConfig');
    logger.log(' ///////////////////////////////////////////////////////////');
    logger.log(' //////////////////// App going to start ///////////////////');
    logger.log(' ///////////////////////////////////////////////////////////');
    App.start(appConfig);
  } catch (err) {
    logger.log('Error while starting the application :', err);
  }
})();