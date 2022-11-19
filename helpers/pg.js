const { Pool } = require("pg");

export const pool = new Pool({
  user: 'postgres',
  host: 'garbage-collector.conzym2rhmm6.eu-central-1.rds.amazonaws.com',
  database: 'postgres',
  password: 'iK4n6pUDcPPFBD6',
  port: 5432,
});
