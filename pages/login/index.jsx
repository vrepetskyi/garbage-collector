import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Form.module.css";

export default function Login() {
  const [loginInputs, setLoginInputs] = useState({});
  const router = useRouter();

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLoginInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFormSubmit = () => {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: loginInputs.email,
        password: loginInputs.password,
      }),
    })
      .then((response) => {
        console.log(response);
        router.push("/profile");
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
      <p>Do not have an account? <Link href="/register">Create one!</Link></p>
    </div>
  );
}
