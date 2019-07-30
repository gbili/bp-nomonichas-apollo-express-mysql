import Book from '../models/Book';

const resolver = {
  Query: {
    books: () => Book.all(),
  },

  Mutation: {
    // parent refers to the parent resolver when
    // there are nested resolvers (not used here)
    addBook: (parent, bookInput) => {
      console.log(bookInput);
      const book = new Book(bookInput);

      // should save the book to storage here....

      return book; // the book will be serialized properly
    },
  },
};

export default resolver;
