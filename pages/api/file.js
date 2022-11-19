import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false
  }
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm({hashAlgorithm: 'sha256'});

  form.parse(req, (err, _, files) => {
    if (err) {
      console.log(err);

      return;
    }
    const data = fs.readFileSync(files.file.filepath);
    fs.writeFileSync('./public/pictures/' + files.file.hash, data);
  });
};


export default (req, res) => {
  if (req.method === 'POST') {
    post(req, res);

    res.status(201).send();
    return;
  }

  return res.status(404).send();
};
