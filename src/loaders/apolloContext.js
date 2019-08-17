import AuthHeaderToken from '../services/AuthHeaderToken';
import templateStatusMessages from '../config/templateStatusMessages';

export default {
  instance: AuthHeaderToken,
  async after({ me, serviceLocator }) {
    const fileService =  await serviceLocator.get('fileService');
    const context = {
      authService: await serviceLocator.get('authService'),
      fileService,
      templateStatusMessages,
    };
    return me.getAsyncContextReqMethod(context);
  },
};
