let _locatorRefDict = {};
let _loadDict = {};
let _logger = null;

class DiContainer {

  static inject({ logger }) {
    _logger = logger;
  }

  static async cleanLoad(injectionDict) {
    _loadDict = { ..._loadDict, ...injectionDict };
    for (let refName in _loadDict) {
      _logger.log('loading :', refName);
      await DiContainer.load(refName);
    }
  }

  static async load(refName) {
    _logger.log('DiContainer.Loading: ', refName);
    if (DiContainer.has(refName)) {
      _logger.log('DiContainer.Already loaded: ', refName);
      return;
    }
    if (!_loadDict.hasOwnProperty(refName)) {
      throw new Error('Attempting to load inexistent ref', refName);
    }
    const el = _loadDict[refName];
    let me = null;

    let locateDeps = {};
    let providedDeps = {};
    if (el.hasOwnProperty('deps')) {
      providedDeps = el.deps;
    }
    if (el.hasOwnProperty('locateDeps')) {
      for (let key in el.locateDeps) {
        const depName = el.locateDeps[key];
        el.locateDeps[key] = await DiContainer.get(depName);
      }
      locateDeps = el.locateDeps;
    }
    const deps = {
      ...locateDeps,
      ...providedDeps,
    };

    if (el.hasOwnProperty('injectable')) {
      await el.injectable.inject(deps)
      me = el.injectable;
    }
    if (el.hasOwnProperty('constructible')) {
      el.constructed = Object.keys(deps).length ? new el.constructible(deps) : new el.constructible();
      me = el.constructed;
    }
    if (el.hasOwnProperty('instance')) {
      me = el.instance;
    }
    if (el.hasOwnProperty('after')) {
      await el.after({ me, serviceLocator: DiContainer, el });
    }
    DiContainer.set(refName, me);
  }

  static async get(refName) {
    if (!DiContainer.has(refName)) {
      if (!_loadDict.hasOwnProperty(refName)) {
        throw new Error(`Trying to access inexistent ref: ${refName} available refs are: ${Object.keys(_locatorRefDict).join('\n')}`);
      }
      await DiContainer.load(refName);
    }
    return _locatorRefDict[refName];
  }

  static set(refName, val) {
    if (DiContainer.has(refName)) {
      _logger.log('Replacing existent ref: ', refName);
    }
    _locatorRefDict[refName] = val;
    return val;
  }

  static has(refName) {
    return _locatorRefDict.hasOwnProperty(refName);
  }
}

export default DiContainer;
