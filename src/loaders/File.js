import { File } from '../models';

export default {
  injectable: File,
  locateDeps: { requestor: 'mysqlReq' },
};

