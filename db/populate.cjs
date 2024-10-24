#! /user/bin/env node

const { Client } = require('pg');

const SQL = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    added TIMESTAMP NOT NULL,
    username VARCHAR ( 255 ) NOT NULL,
    text TEXT
  );
`;

async function main() {
  const connectionString = process.argv[2];
  if (!connectionString) throw new Error('No db uri specified');
  console.log('Initializing database...');
  try {
    const client = new Client({
      connectionString,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done');
  } catch (error) {
    console.error(error);
  }
}

main();
