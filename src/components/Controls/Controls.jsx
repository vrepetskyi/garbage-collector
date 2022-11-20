import { ButtonIcon } from "../ButtonIcon/ButtonIcon";

import styles from "./Controls.module.css";

export const Controls = function ({leftOnClick, rightOnClick}) {
  return (
    <div className={styles.container}>
      <ButtonIcon
        className={styles.actionButton}
        onClick={leftOnClick}
        color="red"
        size="l"
        iconType="trash"
      />
      <ButtonIcon
        className={styles.actionButton}
        onClick={rightOnClick}
        color="green"
        size="l"
        iconType="heart"
      />
    </div>
  );
};
