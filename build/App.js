"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
let _appProvider = null;
let _app = null;
let _logger = null;
let _cors = null;

class App {
  static inject({
    appProvider,
    logger,
    cors
  }) {
    _appProvider = appProvider;
    _logger = logger;
    _cors = cors || null;
  }

  static getInstance() {
    if (!_app) {
      _app = _appProvider();
    }

    if (_cors) {
      _app.use(_cors);
    }

    return _app;
  }

  static start({
    port,
    path
  }) {
    // set the port that the express application will listen to
    App.getInstance().listen({
      port
    }, () => {
      _logger.log(`###############################################`);

      _logger.log(`#############  Server running  ################`);

      _logger.log(`# # # # # # # # #   on   # # # # # # # # # # # `);

      _logger.log(`##### # http://localhost:${port}${path} # #####`);

      _logger.log(`###### # # # # # # # # # # # # # # # # # ######`);

      _logger.log(`######## # # # # # # # # # # # # # # # ########`);

      _logger.log(`################## # # # # ####################`);
    });
  }

}

var _default = App;
exports.default = _default;