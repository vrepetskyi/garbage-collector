import styles from "./Card.module.css";
import classNames from "classnames";

export const Card = function ({ image, title, description, id, className }) {
  return (
    <div id={id} className={classNames(styles.card, className)}>
      <img src={image} alt="Item" className={styles.cardImage} />
      <div className={styles.textContent}>
        <h2 className={styles.itemTitle}>{title}</h2>
        <p className={styles.itemDescription}>{description}</p>
      </div>
    </div>
  );
};
