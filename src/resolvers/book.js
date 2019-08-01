const resolver = {
  Query: {
    books: async (_, __, { Book }) => {
      return await Book.all();
    },
  },

  Mutation: {
    // parent refers to the parent resolver when
    // there are nested resolvers (not used here)
    addBook: (parent, { input }, { Book }) => {
      const book = new Book(input);
      book.save();
      return book; // the book will be serialized properly
    },
  },
};

export default resolver;
