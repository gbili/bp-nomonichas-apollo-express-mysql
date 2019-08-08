import DiContainer from './loaders';

(async function () {
  try {
    const di = DiContainer.getLatestContainer();
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
