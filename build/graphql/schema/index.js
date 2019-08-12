"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = require("fs");

var _apolloServer = require("apollo-server");

const baseSchemaFileName = 'schema.graphql';

const getGraphqlContents = (dir, filename) => _apolloServer.gql`${(0, _fs.readFileSync)(`${dir}/${filename}`, 'utf-8')}`;

const graphqlFilesNotBase = f => f.substring(f.length - '.graphql'.length, f.length) === '.graphql' && f !== baseSchemaFileName;

const baseSchema = getGraphqlContents(__dirname, baseSchemaFileName);
let restOfSchemas = (0, _fs.readdirSync)(__dirname).filter(graphqlFilesNotBase);
restOfSchemas = restOfSchemas.map(filename => getGraphqlContents(__dirname, filename));
const schema = [baseSchema, ...restOfSchemas];
var _default = schema;
exports.default = _default;