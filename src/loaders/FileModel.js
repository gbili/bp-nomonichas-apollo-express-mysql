import { FileModel } from '../models';

export default {
  injectable: FileModel,
  locateDeps: {
    requestor: 'mysqlReq',
  },
};
