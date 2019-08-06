import 'dotenv/config';
import logger from 'saylo';
import { MysqlReq } from 'mysql-oh-wait';
import argon2 from 'argon2';

const saltRounds = 10;

class UserRecord {
  constructor({ ID, username, email, cryptedPassword }) {
    this.userInstance = new User({ ID, username, email });
    this.cryptedPassword = cryptedPassword;
  }

  get ID() {
    return this.userInstance.ID;
  }

  get username() {
    return this.userInstance.username;
  }

  get email() {
    return this.userInstance.email;
  }

  /**
   * @return User ||false
   */
  static async register({ username, email, plainPassword }) {
    const cryptedPassword = await argon2.hash(plainPassword, saltRounds);
    const res = await MysqlReq.query({
      sql: 'INSERT INTO User (username, email, cryptedPassword) VALUES (?, ?, ?)',
      values: [username, email, cryptedPassword],
    });
    if (!res) {
      return false; // user already exists, should login
    }
    const userRecord = new UserRecord({ID: res.insertId, username, email, cryptedPassword });
    return userRecord.userInstance;
  }

  /**
   * @return User || null
   */
  static async authenticate({ username, email, plainPassword }) {
    if (!plainPassword) {
      throw new Error('must provide plainPassword');
    }
    let userRecords = null;
    if (username) {
      userRecords = await UserRecord._getUserRecordsByUsername({ username });
    } else if (email) {
      userRecords = await UserRecord._getUserRecordsByEmail({ email });
    } else {
      throw new Error('must provide username or email');
    }

    let passwordsMatch = false;
    let userRecord = null;
    if (userRecords.length) {
      userRecord = userRecords[0];
      passwordsMatch = await argon2.verify(userRecord.cryptedPassword, plainPassword);
    }

    return (passwordsMatch && userRecord.userInstance) || null;
  }

  /**
   * @return [ User ] || []
   */
  static async all() {
    return await MysqlReq.query({
      sql: 'SELECT * FROM User',
      after: res => res.map(row => (new UserRecord(row)).userInstance)
    });
  }

  /**
   * @return [ UserRecord ] || []
   */
  static async _getUserRecordsByEmail(params) {
    const { email } = params;
    if (!email) {
      throw new Error('must provide email');
    }
    return await UserRecord._getUserRecordsBy(params);
  }

  /**
   * @return [ UserRecord ] || []
   */
  static async _getUserRecordsByUsername(params) {
    const { username } = params
    if (!username) {
      throw new Error('must provide username');
    }
    return await UserRecord._getUserRecordsBy(params);
  }

  /**
   * @return [ UserRecord ] || []
   */
  static async _getUserRecordsBy(params) {
    let sql = 'SELECT ID, username, email, cryptedPassword FROM User WHERE ?'
    return await MysqlReq.query({
      sql,
      values: params,
      after: res => res.map(row => new UserRecord(row))
    });
  }
}

class User {
  constructor({ID, username, email }) {
    // a Registered User without the password
    this.ID = ID;
    this.username = username;
    this.email = email;
  }

  static async register({ username, email, plainPassword }) {
    return await UserRecord.register({ username, email, plainPassword });
  }

  static async authenticate({ username, email, plainPassword }) {
    return await UserRecord.authenticate({ username, email, plainPassword });
  }

  static async all() {
    return await UserRecord.all();
  }
}

export { User, UserRecord };
export default User;
