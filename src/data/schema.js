import { mysqlConnection } from './connection';
import { readFileSync } from 'fs';

let databaseDump = readFileSync(`${__dirname}/schema.sql`, 'utf-8')

mysqlConnection.query(databaseDump, (err, result) => {
  if (err) throw err;
  console.log(result);
});

mysqlConnection.end(err => { if (err) throw err});
