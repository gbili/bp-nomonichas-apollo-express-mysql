import 'dotenv/config';
import mysql from 'mysql';

const mysqlConnection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydatabase',
});

class MysqlReq {

  static async query({ sql, values }) {
    try {
      const res = await (new Promise((resolve, reject) => {
        const cb = (err, result) => (err ? reject(err) : resolve(result));
        if (values) MysqlReq.getConnection().query(sql, values, cb);
        else MysqlReq.getConnection().query(sql, cb);
      }));
      return res;
    } catch (err) {
      console.log('There was an error');
      throw err;
    }
  }

  static getThreadId() {
    return MysqlReq.getConnection().threadId;
  }

  static isConnected() {
    return Number.isInteger(MysqlReq.getThreadId());
  }

  static connectOnce() {
    if (!MysqlReq.isConnected()) {
      MysqlReq.getConnection().connect(err => {
        if(err) throw err;
        console.log(`Connected to database, threadId: ${ MysqlReq.getThreadId() }`);
      });
    }
  }

  static disconnect() {
    MysqlReq.isConnected() && MysqlReq.getConnection().end();
  }

  static getConnection() {
    return mysqlConnection;
  }
}

export default MysqlReq;
