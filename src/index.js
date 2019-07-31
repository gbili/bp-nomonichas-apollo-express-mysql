import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mysql from 'mysql';
import cors from 'cors';

import schema from './schema';
import resolvers from './resolvers';

const dev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3030;
const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'mydatabase',
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const app = express();
app.use(cors());

// use the express application as middleware in apollo server
server.applyMiddleware({ app, path: graphqlPath });

// set the port that the express application will listen to
app.listen({ port }, () => {
  console.log(`Server running on http://localhost:${port}${graphqlPath}`);
});
