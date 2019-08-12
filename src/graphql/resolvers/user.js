const resolver = {
  Query: {
    getLoggedInUser: async (_, __, { loggedInUser, AuthService }) => {
      return loggedInUser;
    },
  },

  Mutation: {
    registerUser: async (_, { input }, { AuthService }) => {
      try {
        const user = await AuthService.register(input);
        return user;
      } catch (err) {
        console.log('error', err);
        throw err;
      }
    },
  },
};

export default resolver;
