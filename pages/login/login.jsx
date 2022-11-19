import { useState } from "react";
import styles from "../../styles/Form.module.css";
import axios from "axios";

export default function Login() {
  const [loginInputs, setLoginInputs] = useState({});

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFormSubmit = () => {
    // todo url
    axios
      .post("", {
        email: loginInputs.email,
        password: loginInputs.password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.content}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <header>
          <h1 className={styles.header}>Login</h1>
        </header>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="e-mail"
          className={styles.input}
          value={loginInputs.email || ""}
          onInput={handleInputChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className={styles.input}
          value={loginInputs.password || ""}
          onInput={handleInputChange}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
