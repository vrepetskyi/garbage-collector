import { pool } from "helpers/pg";
import { validateToken } from "helpers/jwt";

const userSeenProducts = {};

export default async function handle(req, res) {
  let userId = null;

  if (!(userId = validateToken(req, res))) return res.status(401).send();

  if (!userId in userSeenProducts || "reset" in req.query)
    userSeenProducts[userId] = [];

  const {
    rows: [pickedProduct],
  } = await pool.query(
    "SELECT id, title, description FROM products WHERE user_id != $1 AND id NOT IN ($2) LIMIT 1;",
    [userId, userSeenProducts[userId].join(", ")]
  );

  console.log(pickedProduct)

  userSeenProducts[userId].push(pickedProduct.id);

  const { rows: images } = await pool.query(
    "SELECT path FROM images WHERE product_id = $1",
    [pickedProduct.id]
  );

  const mappedImages = images.map((image) => "/pictures/" + image.path);

  return res.json({ ...pickedProduct, images: mappedImages });
}
