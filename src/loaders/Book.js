import { Book } from '../models';

export default {
  injectable: Book,
  locateDeps: { requestor: 'mysqlReq' },
};

