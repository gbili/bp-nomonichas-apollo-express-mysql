const resolver = {
  Query: {
    books: async (_, __, { Book }) => {
      return await Book.all();
    },
  },

  Mutation: {
    // parent refers to the parent resolver when
    // there are nested resolvers (not used here)
    addBook: async (parent, { input }, { Book }) => {
      return await Book.create(input);
    },
  },
};

export default resolver;
