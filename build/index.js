"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _cors = _interopRequireDefault(require("cors"));

var _models = require("./models");

var _mysqlOhWait = require("mysql-oh-wait");

var _schema = _interopRequireDefault(require("./schema"));

var _resolvers = _interopRequireDefault(require("./resolvers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mysqlOhWait.MysqlReq.setConnectionConfig({
  multipleStatements: false
});

_mysqlOhWait.MysqlReq.connect();

const dev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3030;
const graphqlPath = process.env.GRAPHQL_PATH || '/graphql';
const server = new _apolloServerExpress.ApolloServer({
  typeDefs: _schema.default,
  resolvers: _resolvers.default,
  context: {
    Book: _models.Book,
    User: _models.User
  }
});
const app = (0, _express.default)();
app.use((0, _cors.default)()); // use the express application as middleware in apollo server

server.applyMiddleware({
  app,
  path: graphqlPath
}); // set the port that the express application will listen to

app.listen({
  port
}, () => {
  console.log(`Server running on http://localhost:${port}${graphqlPath}`);
});