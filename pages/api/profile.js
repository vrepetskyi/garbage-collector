import { pool } from "helpers/pg";
import { validateToken } from "helpers/jwt";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send();

  let id;
  if (!(id = validateToken(req, res))) return res.status(401).send();

  pool.query("SELECT * FROM users");
}
