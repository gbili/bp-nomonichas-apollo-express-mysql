import RequestorCapability from './RequestorCapability';

const saltRounds = 10;
let _hasher = null;

class UserRecord extends RequestorCapability {
  constructor({ ID, username, email, cryptedPassword }) {
    super();
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

  static inject({requestor, hasher}) {
    RequestorCapability.inject({requestor});
    hasher && UserRecord.setHasher(hasher);
  }

  static setHasher(hasher) {
    _hasher = hasher;
  }

  static getHasher() {
    if (!_hasher) {
      throw new Error('Must set hasher first');
    }
    return _hasher;
  }

  static async register({ username, email, plainPassword }) {
    const cryptedPassword = await UserRecord.getHasher().hash(plainPassword, saltRounds);
    const res = await UserRecord.getRequestor().query({
      sql: 'INSERT INTO User (username, email, cryptedPassword) VALUES (?, ?, ?)',
      values: [username, email, cryptedPassword],
    });

    let user = null;
    if (res) {
      user = (new UserRecord({ID: res.insertId, username, email, cryptedPassword })).userInstance;
    }

    return user || null;
  }

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
      passwordsMatch = await UserRecord.getHasher().verify(userRecord.cryptedPassword, plainPassword);
    }

    const user = (passwordsMatch && userRecord.userInstance) || null;

    return user || null;
  }

  static async all() {
    const userList = await UserRecord.getRequestor().query({
      sql: 'SELECT * FROM User',
      after: res => res.map(row => (new UserRecord(row)).userInstance)
    });

    return userList;
  }

  static async _getUserRecordsByEmail(params) {
    const { email } = params;
    if (!email) {
      throw new Error('must provide email');
    }

    const userRecordList =  await UserRecord._getUserRecordsBy(params);

    return userRecordList;
  }

  static async _getUserRecordsByUsername(params) {
    const { username } = params
    if (!username) {
      throw new Error('must provide username');
    }

    const userRecordList = await UserRecord._getUserRecordsBy(params);

    return userRecordList;
  }

  static async _getUserRecordsBy(params) {
    let sql = 'SELECT ID, username, email, cryptedPassword FROM User WHERE ?'

    const userRecordList = await UserRecord.getRequestor().query({
      sql,
      values: params,
      after: res => res.map(row => new UserRecord(row))
    });

    return userRecordList;
  }
}

class User {
  constructor({ID, username, email }) {
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
