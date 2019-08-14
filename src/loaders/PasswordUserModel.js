import { PasswordUserModel } from '../models';

export default {
  'PasswordUserModel': {
    injectable: PasswordUserModel,
    locateDeps: {
      requestor: 'MysqlReq',
    },
  },
};
