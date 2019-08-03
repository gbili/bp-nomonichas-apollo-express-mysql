const resolver = {
  Query: {
    getLoggedInUser: async (_, __, { loggedInUser, User }) => {
      return loggedInUser;
    },
  },

  Mutation: {
    registerUser: async (_, { input }, { User }) => {
      try {
        const user = await User.register(input);
        return user;
      } catch (err) {
        console.log('error', err);
        throw err;
      }
    },
  },
};

export default resolver;
