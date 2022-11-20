import { pool } from "helpers/pg";
import { validateToken } from "helpers/jwt";

// order_id[]
const cache = [];

export default async function handle(req, res) {
  let userId = null;

  if (!(userId = validateToken(req, res))) return res.status(401).send();

  const { rows: otherProducts } = await pool.query(
    "SELECT id, title, description FROM products WHERE user_id != $1;",
    [userId]
  );

  const mappedProducts = await Promise.all(
    otherProducts.map(async (product) => {
      const { rows: images } = await pool.query(
        "SELECT path FROM images WHERE product_id=$1",
        [product.id]
      );

      if (!images.length) return product;

      const mappedImages = images.map((image) => "/pictures/" + image.path);
      return { ...product, images: mappedImages };
    })
  );

  /**
   * Reduce the row array
   * Find all products and their corresponding images like:
   * {
   *   id: [id],
   *   title: [title],
   *   description: [desciption],
   *   images: [imagePath[]]
   * }
   */
  const query = [];

  row: for (const row of rows) {
    for (const qu of query) {
      if (row.id === qu.id) {
        qu.images.push(row.path);

        continue row;
      }
    }

    query.push({
      id: row.id,
      title: row.title,
      description: row.description,
      images: [row.path],
    });
  }

  const final = [];
  let counter = 0;

  main: for (const qu of query) {
    for (const cacheItem of cache) {
      if (cacheItem === qu.id) continue main;
    }

    final.push(qu);
    cache.push(qu.id);

    if (++counter > 5) break main;
  }

  res.json(final);
}
