import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Form.module.css";

export default function PrivatePage(props) {
  const router = useRouter();
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
    console.log("upload to server");
    const res = await fetch("/api/description", {
      method: "POST",
      body: JSON.stringify(desc),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { uuid } = await res.json();

    const imgagesFetch = [];
    for (const img of images) {
      const body = new FormData();
      body.append("file", img);

      imgagesFetch.push(
        await fetch("/api/file/" + uuid, {
          method: "POST",
          body,
        })
      );
    }

    await Promise.allSettled(imgagesFetch);

    console.log(desc);

    router.push("/");
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
        <img className={styles.img} src={createObjectURL[0]} />
        <label htmlFor="img0">Image number 1.</label>{" "}
        <input
          id="img0"
          type="file"
          name="img0"
          className={styles.input}
          onChange={(e) => uploadToClient(e, 0)}
        />
        <img className={styles.img} src={createObjectURL[1]} />
        <label htmlFor="img1">Image number 2.</label>{" "}
        <input
          id="img1"
          type="file"
          name="img1"
          className={styles.input}
          onChange={(e) => uploadToClient(e, 1)}
        />
        <img className={styles.img} src={createObjectURL[2]} />
        <label htmlFor="img2">Image number 3.</label>{" "}
        <input
          id="img2"
          type="file"
          name="img2"
          className={styles.input}
          onChange={(e) => uploadToClient(e, 2)}
        />
        <button className={styles.button} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}
