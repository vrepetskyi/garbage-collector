import { pool } from "helpers/pg";
import { validateToken } from "helpers/jwt";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send();

  let id;
  if (!(id = validateToken(req, res))) return res.status(401).send();

  const {
    rows: [user],
  } = await pool.query("SELECT name, surname, email, address FROM users WHERE id=$1", [
    id,
  ]);

  const { rows: products } = await pool.query(
    "SELECT id, title, description FROM products WHERE user_id=$1",
    [id]
  );

  user.products = products.map(async (product) => {
    const { rows: images } = await pool.query(
      "SELECT path FROM images WHERE product_id=$1",
      [product.id]
    );
    return { ...product, images };
  });

  res.json(user);
}
