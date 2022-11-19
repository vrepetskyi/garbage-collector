import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from "./Nav.module.css";

export const Nav = function () {
  return (
    <div className={styles.container}>
      <ButtonIcon iconType="settings" color="grey" />
      <img src="images/tinder-logo.png" alt="logo" className={styles.logo} />
      <ButtonIcon iconType="message" color="grey" />
    </div>
  );
};
