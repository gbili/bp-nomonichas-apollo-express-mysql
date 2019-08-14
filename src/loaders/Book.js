import { Book } from '../models';

export default {
  'Book': {
    injectable: Book,
    locateDeps: { requestor: 'MysqlReq' },
  },
};

