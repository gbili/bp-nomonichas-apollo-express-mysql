import AuthHeaderToken from '../services/AuthHeaderToken';
import templateStatusMessages from '../config/templateStatusMessages';

export default {
  instance: AuthHeaderToken,
  async after({ me, serviceLocator }) {
    const context = {
      authService: await serviceLocator.get('authService'),
      models: {
        Book: await serviceLocator.get('Book'),
      },
      templateStatusMessages,
    };
    return me.getAsyncContextReqMethod(context);
  },
};
