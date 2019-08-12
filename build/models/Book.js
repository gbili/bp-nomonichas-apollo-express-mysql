"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RequestorCapability = _interopRequireDefault(require("./RequestorCapability"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Book extends _RequestorCapability.default {
  constructor({
    ID,
    title,
    author
  }) {
    super();
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

    const req = Book.getRequestor();
    const actionResult = await req.query({
      sql: 'INSERT INTO Book (title, author) VALUES (?, ?)',
      values: [title, author]
    });

    if (actionResult.error) {
      return null;
    }

    return new Book({
      ID: actionResult.value.insertId,
      title,
      author
    });
  }

  static async getBookByTitleAuthor({
    title,
    author
  }) {
    const req = Book.getRequestor();
    const actionResult = await req.query({
      sql: 'SELECT * FROM Book WHERE title = ? AND author = ?',
      values: [title, author]
    });

    if (actionResult.error) {
      return null;
    }

    const res = actionResult.value;
    return res && res.length && new Book(res[0]) || null;
  }

  static async all() {
    const req = Book.getRequestor();
    const actionResult = await req.query({
      sql: 'SELECT ID, title, author FROM Book'
    });

    if (actionResult.error) {
      return null;
    }

    return actionResult.value;
  }

}

var _default = Book;
exports.default = _default;