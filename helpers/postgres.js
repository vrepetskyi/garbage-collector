import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_CONNECTION_STRING);

export default sql;
