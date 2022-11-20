import { Icon } from "../Icon/Icon";
import styles from "./ButtonIcon.module.css";
import classNames from "classnames";

export const ButtonIcon = function ({ iconType, color, size="m", onClick, className }) {
  return (
    <button onClick={onClick} className={classNames(styles.button, className, styles[size])}>
      <Icon type={iconType} color={color} />
    </button>
  );
};
