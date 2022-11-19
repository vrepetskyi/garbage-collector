import { useState } from "react";
import styles from "../../styles/Register.module.css";
import axios from "axios";

export default function Register() {
  const [registerInputs, setRegisterinInputs] = useState({});
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setRegisterinInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    if (password.value !== passwordConfirm.value) {
      event.preventDefault();
      setShowErrorMsg(true);
      return;
    } else if (showErrorMsg) {
      setShowErrorMsg(false);
    }

    // todo url, response
    axios
      .post("", {
        email: registerInputs.email,
        password: registerInputs.password,
        firstName: registerInputs.firstName,
        lastName: registerInputs.lastName,
        address: registerInputs.address,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.registerContent}>
      <form className={styles.registerinForm} onSubmit={handleFormSubmit}>
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
    </div>
  );
}
