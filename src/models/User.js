import MysqlReq from '../utils/MysqlReq';
import bcrypt from 'bcrypt';

const saltRounds = 10;

class User {
  constructor({ID, username, email, cryptedPassword}) {
    // a Registered User
    this.ID = ID;
    this.username = username;
    this.email = email;
    this.cryptedPassword = cryptedPassword;
  }

  static async register({ username, email, plainPassword }) {
    const cryptedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const res = await MysqlReq.query({
      sql: 'INSERT INTO User (username, email, cryptedPassword) VALUES (?, ?, ?)',
      values: [username, email, cryptedPassword]
    });
    if (!res) {
      return false; // user already exists, should login
    }
    return new User({ID: res.insertId, username, email, cryptedPassword });
  }

  static async authenticate(params) {
    const { username, email, plainPassword } = params;
    if (!plainPassword) {
      throw new Error('must provide plainPassword');
    }
    let user = null;
    if (username) {
      user = User._getUserByUsername({ username });
    } else if (email) {
      user = User._getUserByEmail({ email });
    } else {
      throw new Error('must provide username or email');
    }
    const passwordsMatch = await bcrypt.compare(plainPassword, user.cryptedPassword);
    return passwordsMatch ? user : null;
  }

  static async _getUserByEmail(params) {
    const { email } = params;
    if (!email) {
      throw new Error('must provide email');
    }
    return await _getUserBy(params);
  }

  static async _getUserByUsername(params) {
    const { username } = params
    if (!username) {
      throw new Error('must provide username');
    }
    return await _getUserBy(params);
  }

  static async _getUserBy(params) {
    let sql = 'SELECT ID, username, email, cryptedPassword FROM User WHERE ?'
    let res = await MysqlReq.query({
      sql,
      values: params
    });
    return (res && res.length && new User(res[0])) || null;
  }

  static async all() {
    return await MysqlReq.query({
      sql: 'SELECT * FROM User'
    });
  }
}

export default User;
