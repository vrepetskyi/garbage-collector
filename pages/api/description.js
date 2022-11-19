import {pool} from '../../helpers/pg';
import {validateToken} from '../../helpers/jwt'
import {v4 as uuid} from 'uuid';

export default async (req, res) => {
    console.log('123')
    let userId = null;
    if(!(userId = validateToken(req, res))) return res.status(403).send();

    // TODO: validation
    console.log(req.body);
    try {
        const unique = uuid();

        await pool.query('INSERT INTO products (id, user_id, title) VALUES ($1, $2, $3);', [unique, userId, req.body.title]);
        
        return res.json({uuid: unique});
    } catch (err) {
        console.log(err);
    }
}