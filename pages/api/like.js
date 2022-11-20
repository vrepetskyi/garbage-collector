import {validateToken} from 'helpers/jwt';
import {pool} from 'helpers/pg';

export default async (req, res) => {
    let userId = null;

    if (!(userId = validateToken(req, res))) return res.status(400).send();


    await pool.query('INSERT INTO likes (user_id, product_id) VALUES ($1, $2);', [userId, req.body.product]);

    res.status(201).send();
}