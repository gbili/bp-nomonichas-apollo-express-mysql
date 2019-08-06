"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mysqlOhWait = require("mysql-oh-wait");

class Book {
  constructor({
    ID,
    title,
    author
  }) {
    this.ID = ID;
    this.title = title;
    this.author = author;
  }

  static async create({
    title,
    author
  }) {
    let book = await Book.getBookByTitleAuthor({
      title,
      author
    });

    if (book) {
      return book;
    }

    let res = await _mysqlOhWait.MysqlReq.query({
      sql: 'INSERT INTO Book (title, author) VALUES (?, ?)',
      values: [title, author]
    });
    return new Book({
      ID: res.insertId,
      title,
      author
    });
  }

  static async getBookByTitleAuthor({
    title,
    author
  }) {
    let res = await _mysqlOhWait.MysqlReq.query({
      sql: 'SELECT * FROM Book WHERE title = ? AND author = ?',
      values: [title, author]
    });
    return res && res.length && new Book(res[0]) || null;
  }

  static async all() {
    return await _mysqlOhWait.MysqlReq.query({
      sql: 'SELECT ID, title, author FROM Book'
    });
  }

}

var _default = Book;
exports.default = _default;