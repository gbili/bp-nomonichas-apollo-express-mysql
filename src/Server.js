let _server = null;
let _classRef = null;
let _params = null;

class ServerFactory {

  static inject({ classRef, constructorParams }) {
    _classRef = classRef;
    _params = constructorParams;
  }

  static getInstance() {
    if (!_server) {
      _server = new _classRef(..._params);
    }
    return _server;
  }

}

export default ServerFactory;
