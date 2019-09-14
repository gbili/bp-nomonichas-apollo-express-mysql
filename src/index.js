import di from './loaders';

try {
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
      throw err;
    }
  })();
} catch (err) {
  throw err;
}
