const books = [
  {
    title: 'Meditations',
    author: 'Marcus Aurelius'
  },
  {
    title: 'How to win friends and influence people',
    author: 'Dale Carnegie'
  },
];

class Book {
  constructor({title, author}) {
    this.title = title;
    this.author = author;
  }

  static all() {
    return books;
  }
}

export default Book;
