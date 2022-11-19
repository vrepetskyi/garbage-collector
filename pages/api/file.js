import formidable from "formidable";
import {v4 as uuid} from 'uuid';
import fs from "fs/promises";
import {pool} from 'helpers/pg';
import {validateToken} from 'helpers/jwt';


export const config = {
  api: {
    bodyParser: false
  }
};

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(400).send();
  
  let userId = null;
   
  if (!(userId = validateToken(req))) return res.status(400).send();

  const form = new formidable.IncomingForm({hashAlgorithm: 'sha256'});

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


    await fs.writeFile('./public/pictures/' + files.file.hash, await fs.readFile(files.file.filepath));

    await pool.query('INSERT INTO images (id, product_id, path) VALUES ($1, $2, $3);', [uuid(), uuid(), files.file.hash]);

  } catch (err) {
    console.log(err);


    return res.status(500).send();
  }
};