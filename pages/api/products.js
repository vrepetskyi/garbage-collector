import { pool } from "helpers/pg";
import { validateToken } from "helpers/jwt";

const userSeenProducts = {};

export default async function handle(req, res) {
  let userId = validateToken(req, res) || null;

  if ("reset" in req.query) userSeenProducts[userId] = [];

  const { rows: otherProducts } = await pool.query(
    "SELECT id, title, description FROM products" +
      (userId ? " WHERE user_id != $1;" : ";"),
    userId && [userId]
  );

  const mappedProducts = await Promise.all(
    otherProducts.map(async (product) => {
      if (userId && userId in userSeenProducts) {
        if (userSeenProducts[userId].includes(product.id)) {
          return false;
        } else {
          userSeenProducts[userId].push(product.id);
        }
      } else userSeenProducts[userId] = [product.id];

      const { rows: images } = await pool.query(
        "SELECT path FROM images WHERE product_id=$1",
        [product.id]
      );

      const mappedImages = images.map((image) => "/pictures/" + image.path);

      return { ...product, images: mappedImages };
    })
  );
  
  return res.json({ products: mappedProducts.filter((p) => !!p).slice(0, 4) });
}
