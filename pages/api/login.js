import { pool } from "helpers/pg";
import { setTokenCookie } from "helpers/jwt";
import { object, string } from "yup";

const loginUserSchema = object({
  email: string().email().required(),
  password: string().required(),
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(400).send();

  try {
    const user = await loginUserSchema.validate(req.body, { strict: true });

    const { rows } = await pool.query(
      "SELECT id FROM users WHERE email=$1 AND password=$2;",
      [user.email, user.password]
    );

    if (rows.length !== 1) throw new Error();

    setTokenCookie(res, rows[0].id);

    return res.send();
  } catch (e) {
    console.log(e);
    return res.status(400).send();
  }
}
