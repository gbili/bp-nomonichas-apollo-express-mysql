import { PasswordUserModel } from '../models';

export default {
  injectable: PasswordUserModel,
  locateDeps: {
    requestor: 'mysqlReq',
  },
};
