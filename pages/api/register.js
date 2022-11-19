import { pool } from "helpers/pg";
import { setTokenCookie } from "helpers/jwt";
import { object, string } from "yup";
import { v4 as uuidv4 } from "uuid";

const newUserSchema = object({
  name: string().required(),
  surname: string().required(),
  address: string().required(),
  email: string().email().required(),
  password: string().required(),
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(400).send();

  try {
    const user = await newUserSchema.validate(req.body);

    const {
      rows: [{ id }],
    } = await pool.query(
      "INSERT INTO users(id, name, surname, address, email, password) VALUES ($6, $1, $2, $3, $4, $5) RETURNING id",
      [
        user.name,
        user.surname,
        user.address,
        user.email,
        user.password,
        uuidv4(),
      ]
    );

    setTokenCookie(res, id);

    return res.send();
  } catch (e) {
    console.log(e);
    return res.status(400).send();
  }
}
