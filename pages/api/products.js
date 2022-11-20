import {pool} from 'helpers/pg';
import {validateToken} from 'helpers/jwt';


// [
//     {
//         userId: [id],
//         products: [products_id]
//     }
// ]
const cache = [];

export default async (req, res) => {
    let userId = null;

    if (!(userId = validateToken(req, res))) return res.status(400).send();



    const {rows} = await pool.query('SELECT products.id, title, description, path FROM products LEFT JOIN images ON products.id = product_id WHERE user_id = $1;', [userId]);

    for (const row of rows) row.path = '/pictures/' + row.path;

    console.log(rows, 'database')
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
                // Push righ away since image path should repeate

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

    // // Array to return to the client
    // let final = [];

    // // Find if user was cached
    // const index = cache.findIndex(i => i.userId === row.user_id);

    // if (index === -1) {
    //     final = rows.slice(0, 5);

    //     cache.push({
    //         userId: row.user_id,
    //         products: [...final.map(i => i.id)]
    //     });
        
    //     console.log('fin len', final.length);
        
    //     return res.json(final);
    // }


    // main: for (const row of rows) {
    //     for (const product of cache[index].products) {
    //         if (row.id === product) break main;
    //     }

    //     // This product was not cached

    //     cache[index].products.push(row.id);
    // }



    // console.log(final);
}
