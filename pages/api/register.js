import sql from "helpers/postgres";
import { setTokenCookie } from "helpers/jwt";
import { object, string } from "yup";

const userSchema = object({
  name: string().required(),
  surname: string().required(),
  address: string().required(),
  email: string().email().required(),
  password: string().required(),
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(400).send();

  try {
    const user = await userSchema.validate(req.body, { strict: true });

    const [{ id }] = await sql`
      INSERT
        INTO users(name, surname, address, email, password)
        VALUES (${user.name}, ${user.surname}, ${user.address}, ${user.email}, ${user.password})
        RETURNING id`;

    setTokenCookie(res, id);

    return res.send();
  } catch (e) {
    console.log(e);
    return res.status(400).send();
  }
}
