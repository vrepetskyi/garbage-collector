const { Pool } = require("pg");

const connectionString = process.env.POSTGRES_CONNECTION_STRING;

export const pool = new Pool({ connectionString });
