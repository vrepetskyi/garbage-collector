import { pool } from "helpers/pg";
import { validateToken } from "helpers/jwt";

const userSeenProducts = {};

export default async function handle(req, res) {
  let userId = null;

  if (!(userId = validateToken(req, res))) return res.status(401).send();

  const { rows: otherProducts } = await pool.query(
    "SELECT id, title, description FROM products WHERE user_id != $1;",
    [userId]
  );

  const mappedProducts = await Promise.all(
    otherProducts.map(async (product) => {
      if (userId in userSeenProducts) {
        if (userSeenProducts[userId].includes(product.id)) {
          return false;
        } else {
          userSeenProducts[userId].push(product.id);
        }
      } else userSeenProducts[userId] = [];

      const { rows: images } = await pool.query(
        "SELECT path FROM images WHERE product_id=$1",
        [product.id]
      );

      const mappedImages = images.map((image) => "/pictures/" + image.path);

      return { ...product, images: mappedImages };
    })
  );

  return res.json(mappedProducts.filter((p) => !!p));
}
