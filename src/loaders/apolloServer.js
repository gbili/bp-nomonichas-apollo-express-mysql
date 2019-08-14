import { ApolloServer } from 'apollo-server-express';
import grapqlSchema from '../graphql/schema';
import resolvers from '../graphql/resolvers';

export default {
  'apolloServer': {
    constructible: ApolloServer,
    deps: {
      typeDefs: grapqlSchema,
      resolvers,
    },
    locateDeps: {
      context: 'apolloContext',
    },
    async after({ me, serviceLocator }) {
      const app = (await serviceLocator.get('app'));
      const path = (await serviceLocator.get('appConfig')).path;
      const logger = (await serviceLocator.get('logger'));
      // use the express application as middleware in apollo server
      logger.log('Going to applyMiddleware');
      me.applyMiddleware({ app , path });
    },
  },
};
