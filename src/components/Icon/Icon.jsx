import { IoSettingsOutline } from "react-icons/io5";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FaTrash, FaHeart } from "react-icons/fa";

import styles from "./Icon.module.css";
import classNames from "classnames";

const IconTypes = {
  settings: IoSettingsOutline,
  message: RiMessage2Line,
  check: AiOutlineCheck,
  close: AiOutlineClose,
  trash: FaTrash,
  heart: FaHeart,
};

export const Icon = function ({ type, color }) {
  const Component = IconTypes[type];

  return <Component className={classNames(styles.icon, styles[color])} />;
};
