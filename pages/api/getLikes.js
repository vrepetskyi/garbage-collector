import {validateToken} from 'helpers/jwt';
import {pool} from 'helpers/pg';

export default async (req, res) => {
    let userId = null;

    if (!(userId = validateToken(req, res))) return res.status(400).send();


    const {rows} = await pool.query('SELECT likes.product_id, title, description, path FROM likes LEFT JOIN images ON likes.product_id = images.product_id LEFT JOIN products ON products.id = likes.product_id  WHERE user_id = $1', [userId]);

    for (const row of rows) row.path = '/pictures/' + row.path;

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
            images: [row.path]
        });

    }


    res.json(query);
}