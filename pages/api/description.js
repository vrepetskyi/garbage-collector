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
        await pool.query('INSERT INTO products (id, user_id, title) VALUES ($1, $2, $3);', [uuid(), userId, req.body.title]);
        
    } catch (err) {
        console.log(err);
    }

    console.log(req.cookies['token']);
}