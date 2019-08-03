import 'dotenv/config';
import mysql from 'mysql';
import logger from '../utils/logger';

let mysqlConnection = null;
let connectionConfig = null;
let locked = false;
let lockedStatePromise = null;

class MysqlReq {

  static async query({ sql, values, after }) {
    let res = null;
    await MysqlReq.awaitLockStatePromises();
    let isConn = await MysqlReq.isConnected();
    if (!isConn) {
      logger.log('MysqlReq.query() You did not connect manually, attempting automatic connection');
      await MysqlReq.connect();
    }
    try {
      res = await (new Promise((resolve, reject) => {
        const cb = (err, result) => (err ? reject(err) : resolve(result));
        if (values) MysqlReq.getConnection().query(sql, values, cb);
        else MysqlReq.getConnection().query(sql, cb);
      }));
    } catch (err) {
      logger.log('MysqlReq.query() failed', {sqlMessage: err.sqlMessage, sql: err.sql, sqlState: err.sqlState}, err);
    }

    if (typeof after === 'function') {
      after(res);
    }

    return res;
  }

  static async awaitLockStatePromises() {
    if (MysqlReq.isLocked()) {
      try {
        await lockedStatePromise;
        logger.log('MysqlReq:awaitLockStatePromises(), finished waiting lockedStatePromise');
        MysqlReq.unlock();
      } catch (err) {
        logger.log('MysqlReq:awaitLockStatePromises(), error', err);
      }
    }
  }

  static configureConnection({ host, user, password, database, multipleStatements }) {
    MysqlReq.disconnect();

    if (!multipleStatements) {
      multipleStatements = false;
    }

    connectionConfig = {
      host: host || process.env.DB_HOST || null,
      user: user || process.env.DB_USER || null,
      password: password || process.env.DB_PASSWORD || null,
      database: database || process.env.DB_NAME || null,
      multipleStatements: multipleStatements
    };

    return connectionConfig;
  }

  static getConnectionConfig() {
    return connectionConfig || MysqlReq.configureConnection({});
  }

  static createConnection() {
    if (null !== mysqlConnection) {
      throw new Error('Cannot create another connection');
    }
    mysqlConnection = mysql.createConnection(MysqlReq.getConnectionConfig());
    logger.log('MysqlReq.createConnection(), Connection created');
  }

  static hasConnection() {
    return mysqlConnection !== null;
  }

  static getConnection() {
    if (null === mysqlConnection) {
      throw new Error('You must create a connection first');
    }
    return mysqlConnection;
  }

  static getThreadId() {
    return (MysqlReq.hasConnection() && MysqlReq.getConnection().threadId) || null;
  }

  static async isConnected() {
    await MysqlReq.awaitLockStatePromises();
    return MysqlReq.hasConnection() && Number.isInteger(MysqlReq.getThreadId());
  }

  static lock(promise) {
    lockedStatePromise = promise;
    locked = true;
    logger.log('MysqlReq:lock(), locked:', locked);
  }

  static unlock() {
    lockedStatePromise = null;
    locked = false;
    logger.log('MysqlReq:unlock(), locked:', locked);
  }
  static isLocked() {
    logger.log('MysqlReq:isLocked(), locked:', locked);
    return locked;
  }

  static async connect() {
    await MysqlReq.awaitLockStatePromises();
    if (await MysqlReq.isConnected()) {
      logger.log('MysqlReq:connect(), Already connected');
      return;
    }
    if (!MysqlReq.hasConnection()) {
      logger.log('MysqlReq:connect(), No connection');
      MysqlReq.createConnection();
    }
    logger.log('MysqlReq:connect(), Connecting...');
    try {
      logger.log('MysqlReq:connect(), locking');
      MysqlReq.lock(new Promise((resolve, reject) => {
        MysqlReq.getConnection().connect(err => ((err && reject(err)) || resolve(true)));
      }));
      await MysqlReq.awaitLockStatePromises();
      logger.log(`MysqlReq:connect(), Connected to database, threadId: ${ MysqlReq.getThreadId() }`);
    } catch (err) {
      logger.log('MysqlReq:connect(), trouble connecting threw: ', err);
    }
  }

  static async disconnect() {
    await MysqlReq.awaitLockStatePromises();
    if (!await MysqlReq.isConnected()) {
      logger.log('MysqlReq:disconnect(), isConnected: false');
      return;
    }
    logger.log('MysqlReq:disconnect(), isConnected: true', MysqlReq.getThreadId());
    try {
      logger.log('MysqlReq:disconnect(), locking');
      MysqlReq.lock(new Promise((resolve, reject) => {
        MysqlReq.getConnection().end(err => ((err && reject(err)) || resolve(true)));
      }));
      await MysqlReq.awaitLockStatePromises();
      mysqlConnection = null;
    } catch (err) {
      logger.log('MysqlReq:disconnect(), difficulties disconnecting', err);
    }
    let isConn = await MysqlReq.isConnected();
    logger.log('MysqlReq:disconnect() end isConnected:', isConn, ' threadId', MysqlReq.getThreadId())
  }
}

export { logger };
export default MysqlReq;
