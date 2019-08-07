import RequestorCapability from './RequestorCapability';
class Book extends RequestorCapability {

  constructor({ID, title, author}) {
    super();
    this.ID = ID;
    this.title = title;
    this.author = author;
  }

  static async create({ title, author }) {
    let book = await Book.getBookByTitleAuthor({ title, author });
    if (book) {
      return book;
    }
    let res = await Book.getRequestor().query({
      sql: 'INSERT INTO Book (title, author) VALUES (?, ?)',
      values: [title, author]
    });
    return new Book({ID: res.insertId, title, author});
  }

  static async getBookByTitleAuthor({ title, author }) {
    let res = await Book.getRequestor().query({
      sql: 'SELECT * FROM Book WHERE title = ? AND author = ?',
      values: [ title, author ],
    });
    return (res && res.length && new Book(res[0])) || null;
  }

  static async all() {
    return await Book.getRequestor().query({
      sql: 'SELECT ID, title, author FROM Book'
    });
  }

}

export default Book;
