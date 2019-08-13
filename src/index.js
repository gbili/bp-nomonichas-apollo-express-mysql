import di from './loaders';

(async function () {
  try {

    await di.loadAll();

    const app = await di.get('app');
    const logger = await di.get('logger');
    const { path, port } = await di.get('appConfig');

    app.listen({ port }, () => {
      logger.log(' ///////////////////////////////////////////////////////////');
      logger.log(` ////////////// App: localhost:${port}/${path} /////////////`);
      logger.log(' ///////////////////////////////////////////////////////////');
    });

  } catch (err) {
    logger.log('Error while starting the application :', err);
  }
})();
