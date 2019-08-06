"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const resolver = {
  Query: {
    books: async (_, __, {
      Book
    }) => {
      return await Book.all();
    }
  },
  Mutation: {
    // parent refers to the parent resolver when
    // there are nested resolvers (not used here)
    addBook: async (parent, {
      input
    }, {
      Book
    }) => {
      return await Book.create(input);
    }
  }
};
var _default = resolver;
exports.default = _default;