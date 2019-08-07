import DiContainer from './loaders';

(async function () {
  try {
    const App = await DiContainer.get('App');
    const logger = await DiContainer.get('logger');
    logger.log(' ///////////////////////////////////////////////////////////');
    logger.log(' //////////////////// App going to start ///////////////////');
    logger.log(' ///////////////////////////////////////////////////////////');
    App.start(await DiContainer.get('appConfig'));
  } catch (err) {
    logger.log('Error while starting the application :', err);
  }
})();
