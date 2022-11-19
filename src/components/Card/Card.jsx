import styles from "./Card.module.css";

export const Card = function ({ image, title, description }) {
  return (
    <div className={styles.card}>
      <img src={image} alt="Item" className={styles.cardImage} />
      <div className={styles.textContent}>
        <h2 className={styles.itemTitle}>{title}</h2>
        <p className={styles.itemDescription}>{description}</p>
      </div>
    </div>
  );
};
