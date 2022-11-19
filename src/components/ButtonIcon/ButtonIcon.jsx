import { Icon } from "../Icon/Icon";
import styles from "./ButtonIcon.module.css";
import classNames from "classnames";

export const ButtonIcon = function ({ iconType, color, className }) {
  return (
    <button className={classNames(styles.button, className)}>
      <Icon type={iconType} color={color} />
    </button>
  );
};
