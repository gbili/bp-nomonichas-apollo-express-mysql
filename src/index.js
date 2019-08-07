import DiContainer from './loaders';

(async function () {
  const App = await DiContainer.get('App');
  App.start(await DiContainer.get('appConfig'));
})();
