import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Form.module.css";

export default function Register() {
  const [registerInputs, setRegisterinInputs] = useState({});
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const router = useRouter();

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterinInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (password.value !== passwordConfirm.value) {
      setShowErrorMsg(true);
      return;
    } else if (showErrorMsg) {
      setShowErrorMsg(false);
    }

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: registerInputs.firstName,
        surname: registerInputs.lastName,
        address: registerInputs.address,
        email: registerInputs.email,
        password: registerInputs.password,
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
          <h1 className={styles.header}>Register</h1>
        </header>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="e-mail"
          className={styles.input}
          value={registerInputs.email || ""}
          onInput={handleInputChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className={styles.input}
          value={registerInputs.password || ""}
          onInput={handleInputChange}
        />
        <div>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="confirm password"
            className={styles.input}
            value={registerInputs.passwordConfirm || ""}
            onInput={handleInputChange}
          />
          <span
            className={styles.errorMsg}
            style={{ display: `${showErrorMsg ? "revert" : "none"}` }}
          >
            passwords don't match
          </span>
        </div>

        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="first name"
          className={styles.input}
          value={registerInputs.firstName || ""}
          onInput={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="last name"
          className={styles.input}
          value={registerInputs.lastName || ""}
          onInput={handleInputChange}
        />
        <input
          type="text"
          name="address"
          id="address"
          placeholder="address"
          className={styles.input}
          value={registerInputs.address || ""}
          onInput={handleInputChange}
        />
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link href="/login">Login!</Link>
      </p>
    </div>
  );
}
