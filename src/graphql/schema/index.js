import { readFileSync, readdirSync } from 'fs';
import { gql } from 'apollo-server';

const baseSchemaFileName = 'schema.graphql';
const getGraphqlContents = (dir, filename) => gql`${readFileSync(`${dir}/${filename}`, 'utf-8')}`;
const graphqlFilesNotBase = f => (f.substring(f.length - '.graphql'.length, f.length) === '.graphql' && f !== baseSchemaFileName)
const baseSchema = getGraphqlContents(__dirname, baseSchemaFileName);

let restOfSchemas = readdirSync(__dirname).filter(graphqlFilesNotBase);
restOfSchemas = restOfSchemas.map(filename => getGraphqlContents(__dirname, filename));

const schema = [
  baseSchema,
  ...restOfSchemas
];

export default schema;
