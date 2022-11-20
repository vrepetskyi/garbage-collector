import { IoSettingsOutline } from "react-icons/io5";
import { RiMessage2Line } from "react-icons/ri";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FaTrash, FaHeart } from "react-icons/fa";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";

import styles from "./Icon.module.css";
import classNames from "classnames";

const IconTypes = {
  settings: IoSettingsOutline,
  message: RiMessage2Line,
  check: AiOutlineCheck,
  close: AiOutlineClose,
  trash: FaTrash,
  heart: FaHeart,
  chevronRight: BsChevronCompactRight,
  chevronLeft: BsChevronCompactLeft,
};

export const Icon = function ({ type, color }) {
  const Component = IconTypes[type];

  return <Component className={classNames(styles.icon, styles[color])} />;
};
