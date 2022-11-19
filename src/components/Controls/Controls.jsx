import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

import styles from "./Controls.module.css";

export const Controls = function () {
  return (
    <div className={styles.container}>
      <ButtonIcon
        className={styles.actionButton}
        color="red"
        size="l"
        iconType="trash"
      />
      <ButtonIcon
        className={styles.actionButton}
        color="green"
        size="l"
        iconType="heart"
      />
    </div>
  );
};
