import { pool } from "helpers/pg";
import { setTokenCookie } from "helpers/jwt";
import { object, string } from "yup";

const newUserSchema = object({
  name: string().required(),
  surname: string().required(),
  address: string().required(),
  email: string().email().required(),
  password: string().required(),
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send();

  let user;
  try {
    user = await newUserSchema.validate(req.body);
  } catch (e) {
    return res.status(422).send(e);
  }

  const { rows: emailMatches } = await pool.query(
    "SELECT 1 FROM users WHERE email=$1;",
    [user.email]
  );

  if (emailMatches.length > 0) return res.status(422).send();

  const {
    rows: [{ id }],
  } = await pool.query(
    "INSERT INTO users(name, surname, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
    [user.name, user.surname, user.address, user.email, user.password]
  );

  setTokenCookie(res, id);
  return res.send();
}
