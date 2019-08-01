import MysqlReq from '../data/connection';

class Book {
  constructor({title, author}) {
    this.title = title;
    this.author = author;
  }

  async save() {
    let res = await MysqlReq.query({
      sql: 'INSERT INTO Book (title, author) VALUES (?, ?)',
      values: [this.title, this.author]
    });
    return res.insertId;
  }

  static async all() {
    return await MysqlReq.query({
      sql: 'SELECT * FROM Book;'
    });
  }
}

export default Book;
