import express from 'express';
//const { importSchema } = require('graphql-import');
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';

const dev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3030;
const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const app = express();

// use the express application as middleware in apollo server
server.applyMiddleware({ app, path: graphqlPath });

// set the port that the express application will listen to
app.listen({ port }, () => {
  console.log(`Server running on http://localhost:${port}${graphqlPath}`);
});
