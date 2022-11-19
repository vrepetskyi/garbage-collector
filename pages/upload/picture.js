import { useState } from "react";
import styles from "../../styles/Form.module.css";

export default function PrivatePage(props) {
  const [images, setImage] = useState([]);
  const [createObjectURL, setCreateObjectURL] = useState([]);
  const [desc, setDesc] = useState({
    title: "",
    desc: "",
  });

  const uploadToClient = (evt, index) => {
    if (evt.target.files && evt.target.files[0]) {
      const i = evt.target.files[0];

      images[index] = i;

      createObjectURL[index] = URL.createObjectURL(i);
      console.log(createObjectURL, "after");
      setImage(images);
      setCreateObjectURL([...createObjectURL]);
    }
  };

  const uploadToServer = async (evt) => {
    evt.preventDefault();
    for (const img of images) {
      const body = new FormData();
      body.append("file", img);
      const response = await fetch("/api/file", {
        method: "POST",
        body,
      });
    }

    await fetch("/api/description", {
      method: "POST",
      body: setDesc,
    });
  };

  const setDescription = (evt) => {
    desc[evt.target.name] = evt.target.value;

    setDesc({ ...desc });
  };

  return (
    <div className={styles.content}>
      <form className={styles.form} onSubmit={uploadToServer}>
        <header>
          <h1 className={styles.header}>Upload item</h1>
        </header>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          className={styles.input}
          value={desc.title || ""}
          onChange={setDescription}
        />
        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="description"
          className={styles.input}
          value={desc.desc || ""}
          onChange={setDescription}
        />
        <img src={createObjectURL[0]} />
        <label htmlFor="img0">Image number 1.</label>{" "}
        <input
          id="img0"
          type="file"
          name="img0"
          onChange={(e) => uploadToClient(e, 0)}
        />
        <img src={createObjectURL[1]} />
        <label htmlFor="img1">Image number 2.</label>{" "}
        <input
          id="img1"
          type="file"
          name="img1"
          onChange={(e) => uploadToClient(e, 1)}
        />
        <img src={createObjectURL[2]} />
        <label htmlFor="img2">Image number 3.</label>{" "}
        <input
          id="img2"
          type="file"
          name="img2"
          onChange={(e) => uploadToClient(e, 2)}
        />
        <button
          className={styles.button}
          type="submit"
        //   onClick={uploadToServer}
        >
          Upload
        </button>
      </form>
    </div>
  );
}
