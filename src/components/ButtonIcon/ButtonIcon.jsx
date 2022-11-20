import { Icon } from "../Icon/Icon";
import styles from "./ButtonIcon.module.css";
import classNames from "classnames";

export const ButtonIcon = function ({
  onClick,
  iconType,
  color,
  size = "m",
  className,
}) {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, className, styles[size])}
    >
      <Icon type={iconType} color={color} />
    </button>
  );
};
