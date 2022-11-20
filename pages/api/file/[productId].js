import formidable from "formidable";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import { pool } from "helpers/pg";
import { validateToken } from "helpers/jwt";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handle(req, res) {
  if (req.method !== "POST") return res.status(400).send();

  let userId;
  let productId = req.query.productId;
  if (!(userId = validateToken(req, res)) || !productId)
    return res.status(401).send();

  const form = new formidable.IncomingForm({ hashAlgorithm: "sha256" });

  try {
    const files = await new Promise((resolve, reject) => {
      form.parse(req, async (err, _, files) => {
        if (err) {
          reject(err);

          return;
        }
        resolve(files);
      });
    });

    await fs.writeFile(
      "./public/pictures/" + files.file.hash,
      await fs.readFile(files.file.filepath)
    );

    const { rows: productMatches } = await pool.query(
      "SELECT 1 FROM products WHERE id=$1 AND user_id=$2",
      [productId, userId]
    );

    if (productMatches.length !== 1) return res.status(404).send();

    await pool.query(
      "INSERT INTO images (id, product_id, path) VALUES ($1, $2, $3);",
      [uuid(), productId, files.file.hash]
    );

    return res.send();
  } catch (err) {
    console.log(err);

    return res.status(500).send();
  }
}
