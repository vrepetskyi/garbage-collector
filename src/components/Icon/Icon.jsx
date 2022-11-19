import { IoSettingsOutline } from "react-icons/io5";
import { RiMessage2Line } from "react-icons/ri";

import styles from "./Icon.module.css"
import classNames from "classnames";

const IconTypes = {
    settings: IoSettingsOutline,
    message: RiMessage2Line
}

export const Icon = function({type, color}){
    const Component = IconTypes[type];

    return <Component className={classNames(styles.icon, styles[color])}/>
}