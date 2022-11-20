import {pool} from 'helpers/pg';
import {validateToken} from 'helpers/jwt';


// order_id[]
const cache = [];

export default async (req, res) => {
    let userId = null;

    if (!(userId = validateToken(req, res))) return res.status(400).send();



    const {rows} = await pool.query('SELECT products.id, title, description, path FROM products LEFT JOIN images ON products.id = product_id WHERE user_id != $1;', [userId]);

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
