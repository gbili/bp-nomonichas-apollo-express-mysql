"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const resolver = {
  Query: {
    books: async (_, __, {
      authService,
      token,
      models
    }) => {
      if (!(await authService.authenticate({
        token
      }))) {
        throw new Error('Authentication required for this operation');
      }

      const {
        Book
      } = models;
      return await Book.all();
    }
  },
  Mutation: {
    // parent refers to the parent resolver when
    // there are nested resolvers (not used here)
    addBook: async (parent, {
      input
    }, {
      authService,
      token,
      models
    }) => {
      if (!(await authService.authenticate({
        token
      }))) {
        throw new Error('Authentication required for this operation');
      }

      const {
        Book
      } = models;
      return await Book.create(input);
    }
  }
};
var _default = resolver;
exports.default = _default;